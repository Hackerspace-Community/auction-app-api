/**
 * Node Modules Imports
 */
import express from "express";
import cors from "cors";
import morgan from "morgan";

/**
 * Utils
 */
import { connectDB } from "./utils/connectDB.js";

/**
 * Routes Imports
 */
import UserRouter from "./routes/v1/user/user.router.v1.js";
import ProductRouter from "./routes/v1/listing/listing.router.v1.js";

/**
 * Declarations
 */
const app = express();

/**
 * Connect to DB
 */
connectDB(process.env.MONGODB_URI);

/**
 * Express Middlewares
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/**
 * Routes Middlewares
 */
app.use("/api/v1/", UserRouter);
app.use("/api/v1/", ProductRouter);

/**
 * Home route.
 */
app.route("/").get((req, res) => {
    res.send({
        message: `Server is online 🚀`
    });
});

/**
 * Default error handling middleware.
 */
app.use((err, req, res, next) => {
    console.error(err);
    const { status = 500, message = "Something went wrong", stack } = err;
    res.status(status).send({ message, stack });
})

export default app;