import { Request, Response, NextFunction } from "express";
import userdata from "../models/user.model";
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
const jwt = require("jsonwebtoken");

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const account = await userdata.findOne({ where: { email } });

    // Check if account exists and password is correct
    if (account && bcrypt.compareSync(password, account.password)) {
      // Generate token with a secret and a defined expiration
      const token = jwt.sign(
        { id: account.id, email: account.email, role: account.role },
        process.env.JWT_SECRET, // Use a fallback secret during development
        { expiresIn: "1h" }
      );
      await userdata.update(
        { token: token },
        {
          where: {
            email: account.email,
          },
        }
      );

      // Return success response with token and user data
      return res.status(200).json({
        status: 200,
        message: "Login successful",
        data: {
          user: { id: account.id, email: account.email, role: account.role },
          token,
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
  const {
    name,
    email,
    password,
    role,
    age,
    subject,
    contactInfo,
    address,
    type,
  } = req.body;

  try {
    // Validate email uniqueness
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create User
    const newUser = await User.create({
      Name: name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET, // Ensure to set this in production
      { expiresIn: "1h" }
    );

    switch (role) {
      case "Student":
        await Student.create({ age, userId: newUser.id });
        break;
      case "Teacher":
        await Teacher.create({ subject, userId: newUser.id });
        break;
      case "Parent":
        await Parent.create({ contactInfo, userId: newUser.id });
        break;
      case "Organization":
        await Organization.create({ address, type, user_id: newUser.id });
        break;
      case "Representative":
        await Representative.create({ userId: newUser.id });
        break;
      case "Class":
        await Class.create({ classId: newUser.id });
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
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Registration failed", error: error });
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
export { login, registration, sendOTP, verifyOTP, resetPassword };
