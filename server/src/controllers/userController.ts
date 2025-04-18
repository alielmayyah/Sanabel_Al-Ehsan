import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import Parent from "../models/parent.model";
import Representative from "../models/representative.model";
import Class from "../models/class.model";
import Organization from "../models/oraganization.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import generateOTP from "../helpers/generateOtp";
import StudentTask from "../models/student-task.model"; // Import the StudentTask model
import Task from "../models/task.model"; // Import the Task model
import Challenge from "../models/challenge.model";
import StudentChallenge from "../models/student-challenge.model";
import { JwtPayload } from "jsonwebtoken";
import generateUniqueConnectCode from "../helpers/generateRandomconnectcode";
import upload from "../config/cloudaryconfig"; // Import multer config

const jwt = require("jsonwebtoken");

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const account = await User.findOne({ where: { email } });

    // Check if account exists and password is correct
    if (account && bcrypt.compareSync(password, account.password)) {
      // Generate token with a secret and a defined expiration
      const token = jwt.sign(
        { id: account.id, email: account.email, role: account.role },
        process.env.JWT_SECRET
      );
      

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
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Login failed", error: error });
  }
};

// Registration function with role-based user creation

const registration = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role, dateOfBirth, gender, grade } = req.body;

    const checkValidation = await User.findOne({ where: { email } });

    if (!checkValidation) {
      return res.status(403).json({ message: "OTP record not found. Verify OTP before registering." });
    }

    if (!checkValidation.isAccess) {
      return res.status(403).json({ message: "OTP not verified. Verify OTP before resetting password." });
    }

    if (checkValidation.password) {
      return res.status(403).json({ message: "Email is already registered. Login or use another email." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ id: checkValidation.id, email: checkValidation.email, role: checkValidation.role }, process.env.JWT_SECRET, { expiresIn: "1h" });


    // Handle Image Upload (get URL from Cloudinary)
    const profileImg = req.file ? req.file.path : null; 
    await checkValidation.update({ firstName, lastName, role, gender, dateOfBirth, password: hashedPassword ,profileImg});

    switch (checkValidation.role) {
      case "Student":
        const connectCode = await generateUniqueConnectCode();
        await Student.create({ grade, userId: checkValidation.id, profileImg, treeProgress: 1, connectCode });
        break;
      case "Teacher":
        await Teacher.create({ userId: checkValidation.id });
        break;
      case "Parent":
        await Parent.create({ userId: checkValidation.id });
        break;
      default:
        break;
    }

    return res.status(201).json({
      message: "Registration successful",
      data: { token, user: { id: checkValidation.id, email: checkValidation.email, role, profileImg } },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Registration failed", error });
  }
};

const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Generate OTP and set expiry time (e.g., 5 minutes from now)
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Update user with OTP and expiry
    await user.update({ resetOTP: otp, otpExpiry });

    // Send OTP to user via email
    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: 200,
      message: "OTP sent successfully to your email.",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      status: 500,
      message: "Error sending OTP",
      error,
    });
  }
};

const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Verify OTP and check expiry
    const isOtpValid =
      user.resetOTP === otp && user.otpExpiry && user.otpExpiry > new Date();
    if (!isOtpValid) {
      return res.status(400).json({
        status: 400,
        message: "Invalid or expired OTP",
      });
    }

    // OTP is valid, mark the user as verified
    await user.update({ otpVerified: true });

    return res.status(200).json({
      status: 200,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      status: 500,
      message: "Error verifying OTP",
      error,
    });
  }
};
const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Check if OTP was verified recently
    if (!user.otpVerified) {
      return res.status(403).json({
        status: 403,
        message:
          "OTP not verified. Please verify OTP before resetting password.",
      });
    }

    // Hash the new password and update user record
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.update({
      password: hashedPassword,
      resetOTP: null,
      otpExpiry: null,
      otpVerified: false, // Clear the OTP verification flag
    });

    return res.status(200).json({
      status: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      status: 500,
      message: "Error resetting password",
      error,
    });
  }
};
const updatePassword = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  const userRecord = await User.findOne({ where: { id: user.id } });
  if (!userRecord) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  const { old_password, new_password } = req.body;

  if (!bcrypt.compareSync(old_password, userRecord.password)) {
    return res.status(500).json({ message: "Incorrect current password" });
  }

  const hashedPassword = bcrypt.hashSync(new_password, 10);
  await userRecord.update({ password: hashedPassword });

  return res.status(200).json({ message: "Password updated successfully" });
};
export { login, registration, sendOTP, verifyOTP, resetPassword ,updatePassword};
