import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn : "15d"});

    res.cookie("jwt-netflix", token, {
        maxAge : 15 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS(cross-site scripting) attacks. And this we do so that it is not accessed by using JavaScript
        sameSite : "strict", // CSRF attacks cross-site request forgery attacks
        secure : ENV_VARS.NODE_ENV !== "development",
    });

    return token;
}

