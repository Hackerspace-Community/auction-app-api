/**
 * Model imports.
 */
import Listing from "../../../models/listing.model.js";
import User from "../../../models/user.model.js";
import Bid from "../../../models/bid.model.js";

/**
 * Utils imports.
 */
import { catchAsync } from "../../../utils/catchAsync.js";
import { ServerError } from "../../../utils/ServerError.js";


/**
 * Get all products from the database
 */

/**
 * @description - This function creates a new listing.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 *
 * @returns {object} res - The response object with the new listing.
 */
export const createListing = catchAsync(async (req, res) => {
    const user = req.user;

    const {
        title,
        description,
        basePrice,
        category,
        startTime,
        duration
    } = req.body;

    const files = req.files;

    // Validation
    if(!files) return res.status(400).json({
        status: "fail",
        message: "Please upload at least one image"
    });
   
    if (
        title.trim().length === 0 ||
        description.trim().length === 0 ||
        !basePrice ||
        !category ||
        !startTime ||
        !duration
    ) {
        return res.status(400).json({
            status: "fail",
            message: "Please fill all the fields"
        });
    }

    if (title.length < 3 || title.length > 50) {
        return res.status(400).json({
            status: "fail",
            message: "Title must be between 3 and 50 characters long"
        });
    }

    if (description.length < 10 || description.length > 1000) {
        return res.status(400).json({
            status: "fail",
            message: "Description must be between 10 and 1000 characters long"
        });
    }

    const listing = new Listing(req.body);

    // Adding images
    listing.images = files.map(file => ({
        path: file.path,
        filename: file.filename
    }));

    // Associate the listing with the user.
    listing.user = req.user._id;

    // Associate the user with the product.
    user.listings.push(listing._id);

    // 5. Setting the auction status based on time.
    let today = new Date();

    const endTime = listing.endTime;

    if (listing.startTime <= today && endTime >= today) {
        listing.auctionStatus = true;
    } else {
        listing.auctionStatus = false;
    };

    // 6. Saving the product to the database and the updated user.
    await Promise.all([listing.save(), user.save()]);

    return res.status(201).json({
        status: "success",
        data: {
            listing
        }
    });
});
