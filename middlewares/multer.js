/**
 * Node modules.
 */
import multer from "multer";

/**
 * Utils.
 */
import { ServerError } from "../utils/ServerError.js";

const storage = multer.memoryStorage();

export const upload = multer({
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new ServerError( "Please upload an image file", 400));
        }   
        cb(undefined, true);
    },
    storage
})