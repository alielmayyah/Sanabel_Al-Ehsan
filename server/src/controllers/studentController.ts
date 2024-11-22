import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Student from "../models/student.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import StudentTask from "../models/student-task.model";
import Task from "../models/task.model";
import StudentChallenge from "../models/student-challenge.model";
import Challenge from "../models/challenge.model";

const studentData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(401).json({ message: "User data not found in request" });
  }

  try {
    const student = await Student.findOne({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "user", // use the alias defined in the association
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    res.status(200).json({ data: student });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Error fetching student data" });
  }
};

const updateData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;
  const { firstName, lastName, grade } = req.body;

  if (!user) {
    return res.status(401).json({ message: "User data not found in request" });
  }

  const student = await Student.findOne({ where: { userId: user.id } });
  const userRecord = await User.findOne({ where: { id: user.id } });

  if (!student || !userRecord) {
    return res.status(404).json({ message: "User or Student not found" });
  }

  await userRecord.update({ firstName, lastName });

  await student.update({ grade });

  res
    .status(200)
    .json({ message: "User and Student data updated successfully" });
};
const updatePassword = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(401).json({ message: "User data not found in request" });
  }

  const userRecord = await User.findOne({ where: { id: user.id } });
  if (!userRecord) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  const { old_password, new_password } = req.body;

  if (!bcrypt.compareSync(old_password, userRecord.password)) {
    return res.status(401).json({ message: "Incorrect current password" });
  }

  const hashedPassword = bcrypt.hashSync(new_password, 10);
  await userRecord.update({ password: hashedPassword });

  return res.status(200).json({ message: "Password updated successfully" });
};

const deleteData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(401).json({ message: "User data not found in request" });
  }

  const student = await Student.findOne({ where: { userId: user.id } });
  const userRecord = await User.findOne({ where: { id: user.id } });

  if (!student || !userRecord) {
    return res.status(404).json({ message: "User or Student not found" });
  }

  // Delete student first, then delete user
  await student.destroy();
  await userRecord.destroy();

  res
    .status(200)
    .json({ message: "User and Student data deleted successfully" });
};
const appearTaskes = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(401)
        .json({ message: "Student data not found in request" });
    }
    const takses = await StudentTask.findAll({
      where: {
        studentId: student.id,
      },
      include: [
        {
          model: Task,
          as: "task",
          attributes: ["title", "description", "category", "points", "type"],
        },
      ],
    });
    if (!takses) {
      return res
        .status(401)
        .json({ message: "taskes data not found in request" });
    } else {
      return res.status(200).json({ data: takses });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const appearChallanges = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(401)
        .json({ message: "Student data not found in request" });
    }
    const Challenges = await StudentChallenge.findAll({
      where: {
        studentId: student.id,
      },
      include: [
        {
          model: Challenge,
          as: "challenge",
          attributes: ["title", "description", "category", "points"],
        },
      ],
    });
    if (!Challenges) {
      return res
        .status(401)
        .json({ message: "taskes data not found in request" });
    } else {
      return res.status(200).json({ data: Challenges });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export {
  studentData,
  updateData,
  updatePassword,
  deleteData,
  appearTaskes,
  appearChallanges,
};
