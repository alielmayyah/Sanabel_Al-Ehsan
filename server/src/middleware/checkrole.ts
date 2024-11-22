import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Student from "../models/student.model";
import User from "../models/user.model";

const checkstudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(401).json({ message: "User data not found in request" });
  }

  if (user.role == "Student") {
    (req as Request & { user?: JwtPayload }).user = user as JwtPayload;
    next();
  } else {
    return res
      .status(403)
      .json({ status: 403, message: "the User Unauthrised" });
  }
};
export { checkstudent };
