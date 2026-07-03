import { Router } from "express";
import { createTable, getAllTables } from "../controllers/table.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router
    .route("/")
    .get(getAllTables)
    .post(verifyJWT, verifyAdmin, createTable);

export default router;