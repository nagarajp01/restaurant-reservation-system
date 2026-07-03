import { Router } from "express";
import {
    createReservation,
    getMyReservations,
    cancelReservation,
    getAllReservations,
    updateReservation,
    deleteReservation,
    getReservationsByDate
} from "../controllers/reservation.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyJWT, createReservation);

router.get("/my", verifyJWT, getMyReservations);

router.patch("/:reservationId/cancel", verifyJWT, cancelReservation);

router.get("/admin", verifyJWT, verifyAdmin, getAllReservations);
router.get("/by-date", verifyJWT, verifyAdmin, getReservationsByDate);

router
.route("/:reservationId")
.patch(verifyJWT, verifyAdmin, updateReservation)
.delete(verifyJWT, verifyAdmin, deleteReservation);

export default router;