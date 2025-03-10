import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Student from "../models/student.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import StudentTask from "../models/student-task.model";
import Task from "../models/task.model";
import StudentChallenge from "../models/student-challenge.model";
import Challenge from "../models/challenge.model";
import Organization from "../models/oraganization.model";
import Class from "../models/class.model";
import { generatePassword } from "../helpers/generatePassword";
import nodemailer from "nodemailer";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import Tree from "../models/tree.model";

declare global {
  namespace Express {
    interface Request {
      processedData?: Record<string, any>;
    }
  }
}
const studentData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
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
    if (!student) {
      return res.status(404).json({ message: "User or Student not found" });
    } else {
      const treePoint = await Tree.findOne({
        where: { id: student.treeProgress },
        attributes: ["id", "seeders", "water"],
      });
      const responseData = {
        student,
        treePoint: treePoint || null, 
      };
      res.status(200).json({ data: responseData });
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Error fetching student data" });
  }
};

const updateData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;
  const { firstName, lastName, grade } = req.body;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
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

const deleteData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
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
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }
    const taskes = await StudentTask.findAll({
      where: {
        studentId: student.id,
      },
      include: [
        {
          model: Task,
          as: "task",
          attributes: [
            "title",
            "description",
            "category",
            "snabelRed",
            "snabelBleu",
            "snabelYellow",
            "xp",
            "kind",
            "timeToDo",
            "type",
          ],
        },
      ],
    });
    if (!taskes) {
      return res
        .status(404)
        .json({ message: "taskes data not found in request" });
    } else {
      return res.status(200).json({ data: taskes });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const appearTaskesType = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }
    const { category } = req.params;
    const task = await Task.findAll({ where: { category: category } });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task data not found in request" });
    } else {
      return res.status(200).json({ data: task });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const appearTaskesTypeandCategory = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }

    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }

    const { category, type } = req.params;

    // Fetch tasks by category and type
    const task = await Task.findAll({
      where: { category, type },
      include: [
        {
          model: Task,
          as: "task",
          attributes: [
            "title",
            "description",
            "category",
            "snabelRed",
            "snabelBleu",
            "snabelYellow",
            "xp",
            "kind",
            "timeToDo",
            "type",
          ],
        },
      ],
    });

    // Check if tasks exist
    if (task.length === 0) {
      return res.status(404).json({ message: "Task data not found" });
    }

    // Find tasks assigned to the student
    const studentTask = await StudentTask.findAll({
      where: {
        studentId: student.id,
        taskId: task.map((t) => t.id),
      },
    });

    return res.status(200).json({ data: studentTask });
  } catch (error) {
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
};

const appearTaskesCategory = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }
    const taskes = await Task.findAll({ attributes: ["category"] });
    if (!taskes) {
      return res
        .status(404)
        .json({ message: "taskes Category data not found in request" });
    } else {
      return res.status(200).json({ data: taskes });
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
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }
    const challenge = await StudentChallenge.findAll({
      where: {
        studentId: student.id,
        completionStatus: "NotCompleted",
      },
      include: [
        {
          model: Challenge,
          as: "challenge",
          attributes: [
            "title",
            "description",
            "category",
            "point",
            "level",
            "xp",
            "snabelBlue",
            "snabelRed",
            "snabelYellow",
          ],
        },
      ],
    });
    if (!challenge) {
      return res
        .status(404)
        .json({ message: "Challenges data not found in request" });
    } else {
      return res.status(200).json({ data: challenge });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const appearTaskCompletedcountToday = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;

    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }

    // Fetch the student associated with the user
    const student = await Student.findOne({ where: { userId: user.id } });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found for the user" });
    }

    // Fetch tasks for the student completed today
    const tasks = await StudentTask.findAll({
      where: {
        studentId: student.id,
        completionStatus: "Completed",
        date: new Date().toDateString(), // Filter for today's date
      },
      include: [
        {
          model: Task,
          as: "Tasks", // Ensure alias matches the association
          attributes: [
            "title",
            "description",
            "category",
            "snabelRed",
            "snabelYellow",
            "snabelBlue",
            "xp",
          ],
        },
      ],
    });

    // If no tasks are found
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No completed tasks found for the student today" });
    }

    // Transform tasks and count the completed ones

    const completedTasksCount = tasks.length;

    // Send the response
    return res.status(200).json({
      message: "Completed tasks retrieved successfully",
      completedTasksCount,
    });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const appearTaskCompleted = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;

    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }

    // Fetch the student associated with the user
    const student = await Student.findOne({ where: { userId: user.id } });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found for the user" });
    }

    // Fetch tasks for the student completed today
    const tasks = await StudentTask.findAll({
      where: {
        studentId: student.id,
        completionStatus: "Completed",
      },
      include: [
        {
          model: Task,
          as: "Tasks", // Ensure alias matches the association
          attributes: [
            "title",
            "description",
            "category",
            "snabelRed",
            "snabelYellow",
            "snabelBlue",
            "xp",
          ],
        },
      ],
    });

    // If no tasks are found
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No completed tasks found for the student today" });
    }

    // Transform tasks and count the completed ones

    const completedTasksCount = tasks.length;

    // Send the response
    return res.status(200).json({
      message: "Completed tasks retrieved successfully",
      completedTasksCount,
    });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
const calculateCompletedTasksByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    // Get user data from the request
    const user = (req as Request & { user?: JwtPayload }).user;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User data not found in request." });
    }

    // Fetch the student associated with the user
    const student = await Student.findOne({ where: { userId: user.id } });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Not Found: Student data not found for the user." });
    }

    // Fetch completed tasks for the student
    const results = await StudentTask.findAll({
      where: {
        studentId: student.id,
        completionStatus: "Completed",
      },
      include: [
        {
          model: Task,
          attributes: ["category"], // Include only the category field from Task
        },
      ],
    });

    // Calculate task counts by category
    const categoryCounts: Record<string, number> = {};
    let totalCompletedTasks = 0;

    results.forEach((studentTask) => {
      const task = studentTask.get("Task") as Task; // Cast to Task type for type safety
      if (task?.category) {
        categoryCounts[task.category] =
          (categoryCounts[task.category] || 0) + 1;
      }
      totalCompletedTasks++; // Count total completed tasks
    });

    // Return the result
    return res.status(200).json({
      totalCompletedTasks,
      data: categoryCounts,
    });
  } catch (error) {
    // Handle errors and log for debugging
    console.error("Error calculating completed tasks by category:", error);
    return res.status(500).json({
      error: "Internal Server Error: Could not calculate task categories.",
      details: error,
    });
  }
};

const appearChallangesCompleted = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }
    const challenge = await StudentChallenge.findAll({
      where: {
        studentId: student.id,
        completionStatus: "Completed",
      },
      include: [
        {
          model: Challenge,
          as: "challenge",
          attributes: [
            "title",
            "description",
            "category",
            "point",
            "level",
            "xp",
            "snabelBlue",
            "snabelRed",
            "snabelYellow",
          ],
        },
      ],
    });
    if (!challenge) {
      return res
        .status(404)
        .json({ message: "Challenges data not found in request" });
    } else {
      return res.status(200).json({ data: challenge });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const appearLeaderboard = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }
    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }

    const students = await Student.findAll({
      order: [
        ["level", "DESC"], // Sort by level in descending order
        ["xp", "DESC"], // Sort by xp in descending order
      ],
    });

    res.json(students); // Send the sorted data as JSON response
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const buyWaterSeeder = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user)
      return res.status(401).json({ message: "User not authenticated" });

    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const water = Number(req.body.water) || 0;
    const seeders = Number(req.body.seeders) || 0;

    if (water <= 0 && seeders <= 0) {
      return res.status(400).json({ error: "Add some seeders or water first" });
    }

    const totalRed = 2 * (water + seeders);
    const totalBlue = totalRed;
    const totalYellow = totalRed;

    if (
      student.snabelRed < totalRed ||
      student.snabelBlue < totalBlue ||
      student.snabelYellow < totalYellow
    ) {
      return res.status(400).json({ error: "Insufficient snabel balance" });
    }

    // Deduct snabel points
    student.snabelRed -= totalRed;
    student.snabelBlue -= totalBlue;
    student.snabelYellow -= totalYellow;

    // Increment water and seeders count
    student.water += water;
    student.seeders += seeders;

    await student.save(); // Save updates

    res.json({ message: "Updated successfully", student });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const growTheTree = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user?: JwtPayload }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }

    const student = await Student.findOne({ where: { userId: user.id } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student data not found in request" });
    }

    const treeLevel = await Tree.findByPk(student.treeProgress);
    if (!treeLevel) {
      return res.status(404).json({ message: "Tree data not found" });
    }

    // Find the maximum level in the tree
    const maxTreeLevel: number = await Tree.max("id");
    if (student.treeProgress >= maxTreeLevel) {
      return res
        .status(400)
        .json({ message: "You have reached the maximum tree level!" });
    }

    if (
      student.seeders >= treeLevel.seeders &&
      student.water >= treeLevel.water
    ) {
      student.seeders -= treeLevel.seeders;
      student.water -= treeLevel.water;
      student.treeProgress += 1;
      await student.save();

      return res
        .status(200)
        .json({ message: "Tree successfully grown!", student });
    }

    return res
      .status(400)
      .json({ message: "Not enough seeders or water to grow the tree" });
  } catch (error) {
    console.error("Error in growing the tree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addStudent = async (req: Request, res: Response) => {
  const processedData: any = req.processedData;
  const successfulEntries: any[] = [];
  const failedEntries: any[] = [];
  const organizationFiles: Record<
    string,
    { workbook: ExcelJS.Workbook; worksheet: ExcelJS.Worksheet }
  > = {};

  try {
    for (const sheet in processedData) {
      const all_data = processedData[sheet];
      for (const data of all_data) {
        try {
          // Validate and find the organization
          const organization = await Organization.findOne({
            where: { name: data.OrganizationName },
          });
          if (!organization) {
            failedEntries.push({
              row: data,
              error: "School not found in request",
            });
            continue; // Skip this row
          }

          // Check if the workbook and worksheet for the organization exists; if not, create them
          if (!organizationFiles[organization.name]) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Users");
            worksheet.columns = [
              { header: "Email", key: "email", width: 30 },
              { header: "Password", key: "password", width: 20 },
            ];
            organizationFiles[organization.name] = { workbook, worksheet };
          }

          const { worksheet } = organizationFiles[organization.name];

          // Validate and find the class
          const class_data = await Class.findOne({
            where: {
              organizationId: organization.id,
              classname: data.ClassName,
              category: data.Grade,
            },
          });
          if (!class_data) {
            failedEntries.push({
              row: data,
              error: "Class not found in request",
            });
            continue; // Skip this row
          }

          const email = data.Email;
          if (await User.findOne({ where: { email: email } })) {
            failedEntries.push({
              row: data,
              error: "Email is already in use",
            });
            continue; // Skip this row
          }

          // Extract data for user and student creation
          const password = generatePassword();
          const hashedPassword = bcrypt.hashSync(password, 10);

          const new_user = await User.create({
            firstName: data.FirstName,
            lastName: data.LastName,
            email,
            role: "Student",
            password: hashedPassword,
            dateOfBirth: data.DateOfBirth,
            gender: data.Gender,
            isAccess: true,
          });

          // Create the student record
          await Student.create({
            grade: data.Grade,
            userId: new_user.id,
            organizationId: organization.id,
            classId: class_data.id,
          });

          // Send email with credentials
          const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: false,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your account in Snabel elahssan",
            text: `Your email code is ${email}, and your password is ${password}`,
          };

          await transporter.sendMail(mailOptions);

          successfulEntries.push({
            row: data,
            message: "Student added successfully",
          });

          // Add user to the organization's worksheet
          worksheet.addRow({
            email,
            password,
          });
        } catch (error) {
          // Log row-specific errors and skip this row
          failedEntries.push({ row: data, error: error });
        }
      }
    }

    // Save or update the organization's file outside the controller folder
    const outputDir = path.resolve(__dirname, "../../output"); // Adjust path to `output` in the project root
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const savedFiles: string[] = [];
    for (const orgName in organizationFiles) {
      const { workbook } = organizationFiles[orgName];
      const sanitizedOrgName = orgName.replace(/[\/\\?%*:|"<>]/g, "_"); // Sanitize for valid file names
      const filePath = path.resolve(
        outputDir,
        `${sanitizedOrgName}_Users.xlsx`
      );

      // If the file exists, overwrite it, otherwise create a new one
      await workbook.xlsx.writeFile(filePath);
      savedFiles.push(filePath);
    }

    // Respond with a summary of successes, failures, and file paths
    res.json({
      message: "Excel file processing completed",
      successCount: successfulEntries.length,
      failureCount: failedEntries.length,
      successfulEntries,
      failedEntries,
      files: savedFiles,
    });
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export {
  addStudent,
  studentData,
  updateData,
  updatePassword,
  deleteData,
  appearTaskes,
  appearChallanges,
  appearTaskCompleted,
  appearTaskCompletedcountToday,
  calculateCompletedTasksByCategory,
  appearTaskesCategory,
  appearChallangesCompleted,
  appearLeaderboard,
  appearTaskesType,
  appearTaskesTypeandCategory,
  buyWaterSeeder,
  growTheTree,
};
