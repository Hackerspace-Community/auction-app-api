import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloud = cloudinary.v2;

/**
 * Cloudinary config.
 */
cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/**
 * Multer config.
 */
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloud,
    params: {
        folder: 'AuctionAppAPI',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    }
});

export const cloudinaryUpload = multer({
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new ServerError( "Please upload an image file", 400));
        }   
        cb(undefined, true);
    },
    storage: cloudinaryStorage
});