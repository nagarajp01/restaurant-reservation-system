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

export {
    createTable,
    getAllTables
};