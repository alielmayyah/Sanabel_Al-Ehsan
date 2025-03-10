"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ status: 401, message: "Token required" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not set in environment variables.");
        return res
            .status(500)
            .json({ status: 500, message: "Server configuration error" });
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 403, message: "Token is invalid" });
        }
        // Use a type assertion to extend req locally with a `user` property
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
