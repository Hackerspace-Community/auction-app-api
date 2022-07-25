/**
 * Node modules.
 */
import validator from "validator";

/**
 * Utils imports
 */
import { newToken } from "../../../utils/jwt.js";
import { catchAsync } from "../../../utils/catchAsync.js";

/**
 * Models Imports.
 */
import User from "../../../models/user.model.js"


/**
 * This function Registers a new user
 *
 * @param {object} req contains object of data required for registration
 * @param {object} res response object
 * @returns {undefined}
 */
export const registerUser = catchAsync(async (req, res) => {
  const { email, firstName, lastName, password, phoneNumber, dob } = req.body;

  if (!email || !firstName || !lastName || !password || !phoneNumber || !dob) {
    return res.status(400).json({
      status: "fail",
      message: "Please fill all the fields"
    });
  }

  if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
    return res.status(400).json({
      status: "fail",
      message: "First name and last name must only contain letters"
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Please enter a valid email"
    });
  }

  if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
    return res.status(400).json({
      status: "fail",
      message: "Please enter a valid phone number"
    });
  }

  if (!validator.isLength(password, { min: 6, max: 20 })) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 6 characters long"
    });
  }

  // Default role
  const role = "ROLE_USER";

  // Check if user exists with the provided phone or email
  const existingUser = await User.findOne({
    $or: [
      {
        email,
      },
      {
        phoneNumber,
      },
    ],
  });

  if (existingUser) {
    return res.status(400).json({
      status: "fail",
      message: "User already exists",
    });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dob,
    role,
  });

  const token = newToken(user._id);
  user.tokens.push({ token });
  await user.save();

  return res.status(201).json({
    status: "success",
    data: {
      user : {
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        role
      },
      token,
    }
  })
});

/**
 * @description - This function logs in a user
 * 
 * @param {object} req contains object of data required for login
 * @param {object} res response object
 * @returns {undefined}
 */
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please fill all the fields"
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect email or password"
    });
  }

  const match = await user.checkPassword(password);
  if (!match) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect email or password"
    });
  }

  const token = newToken(user._id);
  user.tokens.push({ token });
  await user.save();

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        role: user.role,
      },
      token,
    }
  });
});