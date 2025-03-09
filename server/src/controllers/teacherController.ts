import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      processedData?: Record<string, any>;
    }
  }
}

const appearStudent = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }
  try {
    const teacher = await Teacher.findOne({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "user", // use the alias defined in the association
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
    if (!teacher) {
      return res.status(404).json({ message: "User or Teacher not found" });
    } else {
      const students = await User.findAll({
        attributes: ["id", "firstName", "lastName", "email"],
        where: { role: "Student" },
      });
      res.status(200).json({ data: students });
    }
  } catch (error) {
    console.error("Error fetching Teacher data:", error);
    res.status(500).json({ message: "Error fetching Teacher data" });
  }
};

export { appearStudent };
