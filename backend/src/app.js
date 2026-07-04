import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express();


// console.log("CORS:",process.env.CORS_ORIGIN);

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(cookieParser());
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Restaurant Reservation API is running"
    });
});



//routers import

import userRouter from "./routes/user.routes.js";
import tableRouter from "./routes/table.routes.js";
import reservationRouter from "./routes/reservation.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tables", tableRouter);
app.use("/api/v1/reservations", reservationRouter);




export { app };