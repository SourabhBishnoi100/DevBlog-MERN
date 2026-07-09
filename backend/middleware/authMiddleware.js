import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        res.status(401);
        throw new Error("Authentication failed, token missing.");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
        res.status(401);
        throw new Error("User no longer exists.");
    }

    next();
});