import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reservation } from "../models/reservation.model.js";
import { Table } from "../models/table.model.js";

const createReservation = asyncHandler(async (req, res) => {

    const {
        tableId,
        reservationDate,
        reservationTime,
        numberOfGuests
    } = req.body;

    if (
        !tableId ||
        !reservationDate ||
        !reservationTime ||
        !numberOfGuests
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const table = await Table.findById(tableId);

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    if (numberOfGuests > table.capacity) {
        throw new ApiError(
            400,
            "Number of guests exceeds table capacity"
        );
    }

    // Normalize date
    const normalizedDate = new Date(reservationDate);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const existingReservation = await Reservation.findOne({
        table: tableId,
        reservationDate: normalizedDate,
        reservationTime,
        status: "Booked"
    });

    if (existingReservation) {
        throw new ApiError(
            409,
            "Table is already reserved for this date and time"
        );
    }

    const reservation = await Reservation.create({
        customer: req.user._id,
        table: tableId,
        reservationDate: normalizedDate,
        reservationTime,
        numberOfGuests
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            reservation,
            "Reservation created successfully"
        )
    );
});

const getMyReservations = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find({
        customer: req.user._id
    })
    .populate("table", "tableNumber capacity")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            reservations,
            "Reservations fetched successfully"
        )
    );

});
const cancelReservation = asyncHandler(async (req, res) => {

    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new ApiError(404, "Reservation not found");
    }

    if (reservation.customer.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    reservation.status = "Cancelled";

    await reservation.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            reservation,
            "Reservation cancelled successfully"
        )
    );

});

const getAllReservations = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find()
        .populate("customer", "fullName email")
        .populate("table", "tableNumber capacity")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            reservations,
            "All reservations fetched successfully"
        )
    );

});
 
const updateReservation = asyncHandler(async (req, res) => {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new ApiError(404, "Reservation not found");
    }

    const {
        reservationDate,
        reservationTime,
        status,
        numberOfGuests,
        tableId
    } = req.body;

    if (
        !reservationDate &&
        !reservationTime &&
        !status &&
        !numberOfGuests &&
        !tableId
    ) {
        throw new ApiError(400, "Provide at least one field to update");
    }

    const selectedTableId = tableId || reservation.table;

    const table = await Table.findById(selectedTableId);

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    if (
        numberOfGuests &&
        numberOfGuests > table.capacity
    ) {
        throw new ApiError(
            400,
            "Number of guests exceeds table capacity"
        );
    }

    // Normalize date
    const selectedDate = new Date(
        reservationDate || reservation.reservationDate
    );

    selectedDate.setUTCHours(0, 0, 0, 0);

    // Check duplicate booking
    if (reservationDate || reservationTime || tableId) {

        const existingReservation = await Reservation.findOne({
            _id: { $ne: reservationId },
            table: selectedTableId,
            reservationDate: selectedDate,
            reservationTime: reservationTime || reservation.reservationTime,
            status: "Booked"
        });

        if (existingReservation) {
            throw new ApiError(
                409,
                "Table is already booked for the selected date and time"
            );
        }
    }

    // Update fields

    if (reservationDate) {
        reservation.reservationDate = selectedDate;
    }

    if (reservationTime) {
        reservation.reservationTime = reservationTime;
    }

    if (status) {
        reservation.status = status;
    }

    if (numberOfGuests) {
        reservation.numberOfGuests = numberOfGuests;
    }

    if (tableId) {
        reservation.table = tableId;
    }

    await reservation.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            reservation,
            "Reservation updated successfully"
        )
    );
});

const deleteReservation = asyncHandler(async (req, res) => {

    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new ApiError(404, "Reservation not found");
    }

    await Reservation.findByIdAndDelete(reservationId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Reservation deleted successfully"
        )
    );
});
export {
    createReservation,
    getMyReservations,
    cancelReservation,
    getAllReservations,
    updateReservation,
    deleteReservation
};