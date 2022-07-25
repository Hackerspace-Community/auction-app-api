/**
 * Node module imorts.
 */
import { Router } from "express";
/**
 * Model imports.
 */
import Listing from "../../../models/listing.model.js";
/**
 * Util imports.
 */
import { cloudinaryUpload } from "../../../middlewares/cloudinary.js";
/**
 * Middleware import
 */
import { protect } from "../../../middlewares/auth/protect.js";
import { role } from "../../../middlewares/auth/role.js";
/**
 * Controller imports.
 */
import { 
    createListing 
} from "../../../controllers/v1/listing/listing.controller.v1.js";


/**
 * Router object.
 */
const ProductRouter = Router();

/**
 * Routes
 */
ProductRouter.route("/listing/create")
    .post(protect, cloudinaryUpload.array("image", 6), createListing);


    
export default ProductRouter;