"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.sendOtp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateOtp_1 = __importDefault(require("../helpers/generateOtp"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingUser = yield user_model_1.default.findOne({ where: { email: email } });
        if (existingUser && existingUser.isAccess) {
            if (existingUser.password == null) {
                return res
                    .status(202)
                    .json({ status: 202, message: "you already access before" });
            }
            else {
                return res
                    .status(400)
                    .json({ status: 400, message: "Email already in use" });
            }
        }
        const otp = (0, generateOtp_1.default)();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST, // e.g., 'smtp.gmail.com' for Gmail, or your SMTP server
            port: Number(process.env.MAIL_PORT) || 587, // Default to 587 for non-secure, 465 for secure
            secure: false, // `true` for port 465, `false` for other ports
            auth: {
                user: process.env.MAIL_USERNAME, // Email username
                pass: process.env.MAIL_PASSWORD, // Email password
            },
        });
        if (existingUser && !existingUser.isAccess) {
            yield existingUser.update({
                resetOTP: otp,
                otpExpiry,
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your OTP Code for Access you account",
                text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
            };
            yield transporter.sendMail(mailOptions);
            return res.status(200).json({
                status: 200,
                message: "OTP sent successfully to your email.",
            });
        }
        const newOtp = yield user_model_1.default.create({
            email,
            resetOTP: otp,
            otpExpiry,
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code for Access you account",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };
        yield transporter.sendMail(mailOptions);
        return res.status(200).json({
            status: 200,
            message: "OTP sent successfully to your email.",
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            error: error,
        });
    }
});
exports.sendOtp = sendOtp;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        // Verify OTP and check expiry
        const isOtpValid = user.resetOTP === otp && user.otpExpiry && user.otpExpiry > new Date();
        if (!isOtpValid) {
            return res.status(400).json({
                status: 400,
                message: "Invalid or expired OTP",
            });
        }
        // OTP is valid, mark the user as verified
        yield user.update({ isAccess: true, resetOTP: null, otpExpiry: null });
        return res.status(200).json({
            status: 200,
            message: "OTP verified successfully",
        });
    }
    catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({
            status: 500,
            message: "Error verifying OTP",
            error,
        });
    }
});
exports.verifyOTP = verifyOTP;
