import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Table } from "../models/table.model.js";

const createTable = asyncHandler(async (req, res) => {
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
        throw new ApiError(400, "Table number and capacity are required");
    }

    const existedTable = await Table.findOne({ tableNumber });

    if (existedTable) {
        throw new ApiError(409, "Table already exists");
    }

    const table = await Table.create({
        tableNumber,
        capacity
    });

    return res.status(201).json(
        new ApiResponse(201, table, "Table created successfully")
    );
});

const getAllTables = asyncHandler(async (req, res) => {

    const tables = await Table.find();

    return res.status(200).json(
        new ApiResponse(200, tables, "Tables fetched successfully")
    );
});

const updateTable = asyncHandler(async (req, res) => {
    const { tableId } = req.params;
    const { tableNumber, capacity, isAvailable } = req.body;

    const table = await Table.findById(tableId);

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    if (tableNumber !== undefined) table.tableNumber = tableNumber;
    if (capacity !== undefined) table.capacity = capacity;
    if (isAvailable !== undefined) table.isAvailable = isAvailable;

    await table.save();

    return res.status(200).json(
        new ApiResponse(200, table, "Table updated successfully")
    );
});

const deleteTable = asyncHandler(async (req, res) => {

    const { tableId } = req.params;

    const table = await Table.findById(tableId);

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    await Table.findByIdAndDelete(tableId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Table deleted successfully")
    );
});

export {
    createTable,
    getAllTables,
    updateTable,
    deleteTable
};