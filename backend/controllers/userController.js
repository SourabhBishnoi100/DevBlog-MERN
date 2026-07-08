import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import setTokenCookie from "../utils/setTokenCookie.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    res.status(400);
    return next(new Error("Please provide all fields !"))
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return next(new Error("User already exists...."));
  }

  const user = await User.create({ name, email, password });

  const token = setTokenCookie(res, user._id);

  return res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
})


export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Missing field");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("invalid credentials");
  }

  //testing wheter .matchPassword method is attached properly
  console.log(user.matchPassword);
  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("invalid credentials");;
  }

  const token = setTokenCookie(res, user._id);

  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    }
  })
})