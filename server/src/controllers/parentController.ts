import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { Op, fn, col, literal } from "sequelize";

import TaskCategory from "../models/task-category.model";
import Parent from "../models/parent.model";
import Student from "../models/student.model";
import StudentTask from "../models/student-task.model";
import Task from "../models/task.model";
import Challenge from "../models/challenge.model";
import StudentChallenge, { CompletionStatus } from "../models/student-challenge.model";

const parentData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  try {
    const parent = await Parent.findOne({
      where: { userId: user.id },
      include: [{
        model: User,
        as: "user", // use the alias defined in the association
      },
      
    ]
     
    });
    if (!parent) {
      return res.status(404).json({ message: "User or Student not found" });
    } else {

      res.status(200).json({ data: parent });
    }
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ message: "Error fetching teacher data" });
  }
};

const updateDataTeacherParent = async (req: Request, res: Response) => {
try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    const { firstName, lastName,email } = req.body;
  
    if (!user) {
      return res.status(404).json({ message: "User data not found in request" });
    }
  
    const userRecord = await User.findOne({ where: { id: user.id } });
  
    if ( !userRecord) {
      return res.status(404).json({ message: "User or Student not found" });
    }
  
    await userRecord.update({ firstName, lastName });
    
  
    res
      .status(200)
      .json({ message: "User and Student data updated successfully" });
} catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ message: "Error fetching teacher data" });
    
}
};


const deleteData = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  const parent = await Parent.findOne({ where: { userId: user.id } });
  const userRecord = await User.findOne({ where: { id: user.id } });
  if (!parent || !userRecord) {
    return res.status(404).json({ message: "User or Student not found" });
  }


  // Delete student first, then delete user
  await parent.destroy();
  await userRecord.destroy();


  res
    .status(200)
    .json({ message: "User and Student data deleted successfully" });
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ message: "Error fetching teacher data" });
  }
};

const searchStuentByCode = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user: JwtPayload | undefined }).user;

        if (!user) {
          return res.status(404).json({ message: "User data not found in request" });
        }
        const parent = await Parent.findOne({ where: { userId: user.id } });
        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }

        const { code } = req.params;
        const student = await Student.findOne({
            where: {connectCode: code },
            include:[{
                model:User,
                as:"user",
                attributes: ["firstName", "lastName","profileImg","gender","dateOfBirth"]
            }]
        }
        
    );
        return res.status(200).json({ data: student });
    } catch (error) {
        console.error("Error fetching teacher data:", error);
        res.status(500).json({ message: "Error fetching teacher data" });
        
    }
}
const connectStudentToParent = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user: JwtPayload | undefined }).user;

        if (!user) {
          return res.status(404).json({ message: "User data not found in request" });
        }
        const parent = await Parent.findOne({ where: { userId: user.id } });
        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }

        const { code } = req.body;
        const student = await Student.findOne({
            where: {connectCode: code },
            include:[{
                model:User,
                as:"user",
                attributes: ["firstName", "lastName","profileImg","gender","dateOfBirth"]
            }]
        });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        await student.update({ ParentId: parent.id });
         
        return res.status(200).json({ message: "Student connected to parent successfully" });
    } catch (error) {
        console.error("Error fetching teacher data:", error);
        res.status(500).json({ message: "Error fetching teacher data" });
        
    }
}
const appearStudentbyparent = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user: JwtPayload | undefined }).user;

        if (!user) {
          return res.status(404).json({ message: "User data not found in request" });
        }
        const parent = await Parent.findOne({ where: { userId: user.id } });
        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }
        const student = await Student.findOne({
            where: {parentId: parent.id },
            include:[{
                model:User,
                as:"user",
                attributes: ["firstName", "lastName","profileImg","gender","dateOfBirth"]
            }]
        });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ data: student });
    } catch (error) {
        console.error("Error fetching teacher data:", error);
        res.status(500).json({ message: "Error fetching teacher data" });
        
    }
}
const addPros = async (req: Request, res: Response) => {
    try {
        // Extract user data from request
        const user = (req as Request & { user?: { id: number } }).user;
        if (!user) return res.status(404).json({ message: "User data not found in request" });
    
        // Find the parent linked to the user
        const parent = await Parent.findOne({ where: { userId: user.id } });
        if (!parent) return res.status(404).json({ message: "Parent data not found in request" });
    
        // Extract request data
        let { taskId, studentIds, comment = "", time } = req.body;
    
        // Validate taskId
        if (typeof taskId !== "number") {
          return res.status(400).json({ message: "Invalid taskId parameter" });
        }
    
        // Ensure studentIds is an array of numbers
        studentIds = Array.isArray(studentIds) ? studentIds : [studentIds];
        if (!studentIds.every((id: number) => typeof id === "number" && !isNaN(id))) {
          return res.status(400).json({ message: "Invalid studentIds parameter" });
        }
    
        // Validate time format (HH:mm)
        if (!time || !/^\d{2}:\d{2}$/.test(time)) {
          return res.status(400).json({ message: "Invalid time format, expected HH:mm" });
        }
    
        // Set today's date with the given time
        const today = new Date();
        const [hours, minutes] = time.split(":").map(Number);
        today.setHours(hours + 2, minutes, 0, 0);
    
        // Fetch students from the database
        const students = await Student.findAll({
          where: { id: { [Op.in]: studentIds } },
        });
    
        // Extract found student IDs
        const foundStudentIds = students.map((student) => student.id);
    
        // Check if all provided student IDs exist
        const missingStudents = studentIds.filter((id: number) => !foundStudentIds.includes(id));
        if (missingStudents.length > 0) {
          return res.status(404).json({
            message: "Some students were not found",
            missingStudents,
          });
        }
    
        // Ensure all students belong to the requesting parent
        const invalidStudents = students.filter((student) => student.ParentId !== parent.id);
        if (invalidStudents.length > 0) {
          return res.status(403).json({
            message: "Some students do not belong to the requesting parent",
            invalidStudentIds: invalidStudents.map((student) => student.id),
          });
        }
    
        // Check if students have already completed the task today
        const existingRecords = await StudentTask.findAll({
          where: {
            studentId: { [Op.in]: studentIds },
            taskId,
            createdAt: {
              [Op.gte]: new Date().setHours(0, 0, 0, 0), // Start of today
              [Op.lt]: new Date().setHours(23, 59, 59, 999), // End of today
            },
          },
          attributes: ["studentId"],
        });
    
        const existingStudentIds = existingRecords.map((record) => record.studentId);
        const newStudentIds = studentIds.filter((id: number) => !existingStudentIds.includes(id));
    
        if (existingStudentIds.length > 0) {
          return res.status(400).json({
            message: "Some students have already completed this task today",
            existingStudents: existingStudentIds,
          });
        }
    
        // Fetch task details
        const task = await Task.findOne({
          where: { id: taskId },
          include: [{ model: TaskCategory, as: "taskCategory" }],
        });
        if (!task) return res.status(404).json({ message: "Task not found" });
    
        // Fetch challenges related to the task
        const challenges = await Challenge.findAll({
          where: {
            [Op.or]: [
              { category: { [Op.in]: ["snabelBlue", "snabelRed", "snabelMixed", "snabelYellow", "xp", "alltask", "task"] } },
              { taskCategory: task.taskCategory?.title || "" },
            ],
          } as any, // Explicit cast to fix TypeScript errors
        });
    
        // Fetch student challenges that are not completed
        const studentChallenges = await StudentChallenge.findAll({
          where: {
            studentId: { [Op.in]: newStudentIds },
            challengeId: challenges.map((c) => c.id),
            completionStatus: "NotCompleted",
          },
          include: [{ model: Challenge, as: "challenge" }],
        });
    
        // Process each student
        for (const studentId of newStudentIds) {
          // Create student task record
          await StudentTask.create({
            studentId,
            taskId,
            completionStatus: CompletionStatus.Completed,
            comment,
            createdAt: today,
            parentId: parent.id,
          });
    
          // Fetch student record
          const student = students.find((s) => s.id === studentId);
          if (!student) continue;
    
          // Update student's task rewards
          student.xp += task.xp;
          student.snabelRed += task.snabelRed;
          student.snabelBlue += task.snabelBlue;
          student.snabelYellow += task.snabelYellow;
          await student.save();
    
          // Update student's challenge progress
          for (const studentChallenge of studentChallenges) {
            const challenge = studentChallenge.challenge;
    
            // Add points based on challenge category
            if (challenge.category === "xp") studentChallenge.pointOfStudent += task.xp;
            else if (challenge.category === "snabelBlue") studentChallenge.pointOfStudent += task.snabelBlue;
            else if (challenge.category === "snabelRed") studentChallenge.pointOfStudent += task.snabelRed;
            else if (challenge.category === "snabelYellow") studentChallenge.pointOfStudent += task.snabelYellow;
            else if (challenge.category === "snabelMixed") {
              studentChallenge.pointOfStudent += task.snabelBlue + task.snabelRed + task.snabelYellow;
            } else if (challenge.taskCategory === task.taskCategory?.title || challenge.category === "alltask") {
              studentChallenge.pointOfStudent += 1;
            }
    
            // Mark challenge as completed if threshold is met
            if (studentChallenge.pointOfStudent >= challenge.point) {
              studentChallenge.completionStatus = CompletionStatus.Completed;
              student.xp += challenge.xp;
              student.snabelRed += challenge.snabelRed;
              student.snabelBlue += challenge.snabelBlue;
              student.snabelYellow += challenge.snabelYellow;
            }
            await studentChallenge.save();
            await student.save();
          }
        }
    
        return res.status(201).json({ message: "Student tasks recorded successfully" });
      } catch (error) {
        console.error("Error in addPros:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
export { parentData, updateDataTeacherParent, deleteData, searchStuentByCode, connectStudentToParent, appearStudentbyparent, addPros };
