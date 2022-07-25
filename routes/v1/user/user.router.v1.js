/**
 * Node module imports
 */
import { Router } from "express";
/**
 * Model imports.
*/
// const User = require("../../models/user.model");

/**
 * Utils import.
*/
import { upload } from "../../../middlewares/multer.js";
/**
 * Middleware Imports
*/
import { protect } from "../../../middlewares/auth/protect.js";

/**
 * Controller Imports
 */
import { 
    registerUser,
    loginUser, 
} from "../../../controllers/v1/user/user.auth.controller.v1.js";

/**
 * Decalarations
 */
const UserRouter = Router();

/**
 * Routes
 */

// Get all users route.
UserRouter.route("/user/register")
    .post(registerUser);

UserRouter.route("/user/login")
    .post(loginUser);


export default UserRouter;