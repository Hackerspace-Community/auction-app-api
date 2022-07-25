/**
 * Utils.
 */
import { verifyToken } from "../../utils/jwt.js";
import { catchAsync } from "../../utils/catchAsync.js";

/**
 * Models.
 */
import User from "../../models/user.model.js";

/**
 * @description - This middlware checks if the user is logged in or not.
 * 
 * @params {object} req
 * @params {object} res
 * @params {fuction} next
 * @returns next() | if user is verified
 * @returns error | if user is not verified and redirects to login page
 */
export const protect = catchAsync( async (req, res, next)=>{
    try {
        const token = req.header("Authorization").split(" ")[1];
    
        if (!token) return res.status(400).json({ 
            status: "fail", message: "No token provided" 
        });
        
        const payload = await verifyToken(token);
      
        if (!payload) return res.status(400).json({
            status: "fail", message: "Invalid token" 
        });

        // Find the user with the given id who also has the provided token in his tokens array
        const user = await User.findOne({ 
            _id: payload.id, "tokens.token": token 
        });

        if (!user) return res.status(400).json({ 
            status: "fail", message: "No user found" 
        });

        req.token = token;
        req.user = user;

        next();
    } catch (e){
        console.error(e);
        return res.status(400).json({ status: "fail", message: "Invalid token" });
    }
});