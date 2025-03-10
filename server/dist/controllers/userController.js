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
exports.resetPassword = exports.verifyOTP = exports.sendOTP = exports.registration = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const parent_model_1 = __importDefault(require("../models/parent.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateOtp_1 = __importDefault(require("../helpers/generateOtp"));
const jwt = require("jsonwebtoken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const account = yield user_model_1.default.findOne({ where: { email } });
        // Check if account exists and password is correct
        if (account && bcryptjs_1.default.compareSync(password, account.password)) {
            // Generate token with a secret and a defined expiration
            const token = jwt.sign({ id: account.id, email: account.email, role: account.role }, process.env.JWT_SECRET);
            yield user_model_1.default.update({ token: token }, {
                where: {
                    email: account.email,
                },
            });
            // Return success response with token and user data
            return res.status(200).json({
                status: 200,
                message: "Login successful",
                data: {
                    user: {
                        id: account.id,
                        email: account.email,
                        role: account.role,
                        token: token,
                    },
                },
            });
        }
        else {
            return res
                .status(401)
                .json({ status: 401, message: "Incorrect email or password" });
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return res
            .status(500)
            .json({ status: 500, message: "Login failed", error: error });
    }
});
exports.login = login;
// Registration function with role-based user creation
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role, subject, contactInfo, address, type, dateOfBirth, genre, grade, profileImg, } = req.body;
    try {
        const checkValidation = yield user_model_1.default.findOne({ where: { email: email } });
        if (!checkValidation) {
            return res.status(403).json({
                status: 403,
                message: "OTP record not found. Please verify OTP before registering.",
            });
        }
        if (!checkValidation.isAccess) {
            return res.status(403).json({
                status: 403,
                message: "OTP not verified. Please verify OTP before resetting password.",
            });
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const token = jwt.sign({
            id: checkValidation.id,
            email: checkValidation.email,
            role: checkValidation.role,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Create User
        yield checkValidation.update({
            firstName,
            lastName,
            role,
            genre,
            dateOfBirth,
            password: hashedPassword,
        });
        switch (checkValidation.role) {
            case "Student":
                yield student_model_1.default.create({ grade, userId: checkValidation.id, profileImg });
                break;
            case "Teacher":
                yield teacher_model_1.default.create({ subject, userId: checkValidation.id });
                break;
            case "Parent":
                yield parent_model_1.default.create({ contactInfo, userId: checkValidation.id });
                break;
            default:
                break;
        }
        // Return success response with token and user data
        return res.status(201).json({
            status: 201,
            message: "Registration successful",
            data: {
                token,
                user: {
                    id: checkValidation.id,
                    email: checkValidation.email,
                    role: checkValidation.role,
                },
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res
            .status(500)
            .json({ status: 500, message: "Registration failed", error: error });
    }
});
exports.registration = registration;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Find user by email
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        // Generate OTP and set expiry time (e.g., 5 minutes from now)
        const otp = (0, generateOtp_1.default)();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        // Update user with OTP and expiry
        yield user.update({ resetOTP: otp, otpExpiry });
        // Send OTP to user via email
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST, // e.g., 'smtp.gmail.com' for Gmail, or your SMTP server
            port: Number(process.env.MAIL_PORT) || 587, // Default to 587 for non-secure, 465 for secure
            secure: false, // `true` for port 465, `false` for other ports
            auth: {
                user: process.env.MAIL_USERNAME, // Email username
                pass: process.env.MAIL_PASSWORD, // Email password
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code for Password Reset",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };
        yield transporter.sendMail(mailOptions);
        return res.status(200).json({
            status: 200,
            message: "OTP sent successfully to your email.",
        });
    }
    catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({
            status: 500,
            message: "Error sending OTP",
            error,
        });
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        // Find user by email
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
        yield user.update({ otpVerified: true });
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
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    try {
        // Find user by email
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        // Check if OTP was verified recently
        if (!user.otpVerified) {
            return res.status(403).json({
                status: 403,
                message: "OTP not verified. Please verify OTP before resetting password.",
            });
        }
        // Hash the new password and update user record
        const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 10);
        yield user.update({
            password: hashedPassword,
            resetOTP: null,
            otpExpiry: null,
            otpVerified: false, // Clear the OTP verification flag
        });
        return res.status(200).json({
            status: 200,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            status: 500,
            message: "Error resetting password",
            error,
        });
    }
});
exports.resetPassword = resetPassword;
