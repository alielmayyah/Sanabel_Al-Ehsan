import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import User from "../models/user.model";
import Class from "../models/class.model";
import Organization from "../models/oraganization.model";
import { Op, fn, col, literal } from "sequelize";
import { Sequelize, QueryTypes, where } from "sequelize";
import Task from "../models/task.model";
import StudentTask from "../models/student-task.model";
import Challenge from "../models/challenge.model";
import TaskCategory from "../models/task-category.model";
import StudentChallenge from "../models/student-challenge.model";
import { CompletionStatus } from "../models/student-challenge.model"; // ✅ Correct Import
import Parent from "../models/parent.model";
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
    console.error("Error something wrong in TeacherControll", error);
    res.status(500).json({ message: "Error something wrong in Teacher" });
  }
};

const appearclass = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  try {
    const teacher = await Teacher.findOne({
      where: { userId: user.id },
    });

    if (!teacher) {
      return res.status(404).json({ message: "User or Teacher not found" });
    }

    // Fetch all students including class and organization info
    const students = await Student.findAll({
      where: { classId: { [Op.ne]: null } },
      include: [
        {
          model: Class,
          as: "class",
          attributes: ["id", "classname"],
        },
        {
          model: Organization,
          as: "organization",
          attributes: ["id", "name"],
        },
      ],
    });

    // Manually group students by class and organization
    const groupedData: Record<string, any> = {};

    students.forEach((student) => {
      if (student.class && student.organization) {
        const key = `${student.class.id}-${student.organization.id}`;

        if (!groupedData[key]) {
          groupedData[key] = {
            studentCount: 0,
            classId: student.class.id,
            className: student.class.classname,
            organizationId: student.organization.id,
            organizationName: student.organization.name,
          };
        }

        groupedData[key].studentCount += 1;
      }
    });

    // Convert grouped object into an array
    const result = Object.values(groupedData);

    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error something wrong in TeacherControll", error);
    res.status(500).json({ message: "Error something wrong in Teacher" });
  }
};

const appearStudentByclass = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }
  try {
    const teacher = await Teacher.findOne({
      where: { userId: user.id },
    });
    if (!teacher) {
      return res.status(404).json({ message: "User or Teacher not found" });
    } else {
      const classId = req.params.classId;
      if (!classId) {
        return res.status(400).json({ message: "Class ID is required" });
      }
      const students = await Student.findAll({
        attributes: ["id", "grade"],
        where: { classId: classId },
        include: [
          {
            model: Class,
            as: "class",
            attributes: ["id", "classname"],
          },
          {
            model: User,
            as: "user",
            attributes: ["firstName", "lastName", "email"],
          },
        ],
      });
      res.status(200).json({ data: students });
    }
  } catch (error) {
    console.error("Error something wrong in TeacherControll", error);
    res.status(500).json({ message: "Error something wrong in Teacher" });
  }
};

const appearStudentWithoutClassOrganizationName = async (
  req: Request,
  res: Response
) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }
  try {
    const teacher = await Teacher.findOne({
      where: { userId: user.id },
    });
    if (!teacher) {
      return res.status(404).json({ message: "User or Teacher not found" });
    } else {
      const students = await Student.findAll({
        attributes: ["id", "grade"],
        where: { classId: null },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstName", "lastName", "email"],
          },
        ],
      });
      const organization = await Organization.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).json({ students, organization });
    }
  } catch (error) {
    console.error("Error something wrong in TeacherControll", error);
    res.status(500).json({ message: "Error something wrong in Teacher" });
  }
};
const createClass = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user?: JwtPayload }).user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User data not found in request" });
    }

    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    if (!teacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found for this user" });
    }

    const {
      classname,
      classDescription = "",
      category,
      organizationId,
    } = req.body;
    if (!classname || !category || !organizationId) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: classname, category, or organizationId",
        });
    }

    const newClass = await Class.create({
      classname,
      classDescription,
      category,
      organizationId,
    });

    return res
      .status(201)
      .json({ status: "Class created successfully", data: newClass });
  } catch (error) {
    console.error("Error in createClass:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const addStudentToClass = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user?: JwtPayload }).user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Missing user data" });
    }

    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found for this user" });
    }

    const { connectCode, classId } = req.body;

    if (!connectCode || !classId === undefined) {
      return res.status(400).json({ message: "Missing required fields: connectCode, classId" });
    }

    if (isNaN(Number(classId))) {
      return res.status(400).json({ message: "Invalid classId: must be a number" });
    }

    const student = await Student.findOne({ where: { connectCode } });
    if (!student) {
      return res.status(404).json({ message: "Student not found with the provided connectCode" });
    }

    const classExists = await Class.findByPk(classId);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found with the provided classId" });
    }

    if (student.classId === Number(classId)) {
      return res.status(200).json({ message: "No update needed: student is already in this class" });
    }

   await student.update({classId:Number(classId)})
   

    return res.status(200).json({ message: "Student updated successfully" });

  } catch (error) {
    console.error("Error in addStudentToClass:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const appearTaskesTypeandCategories = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User data not found in request" });
    }

    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    const parent = await Parent.findOne({ where: { userId: user.id } });

    if (!teacher && !parent) {
      return res
        .status(404)
        .json({ message: "Teacher or Parent data not found in request" });
    }

    const type = req.params.type;
    const categoryId = Number(req.params.categoryId);

    // Validate categoryId and type
    if (isNaN(categoryId) || !type || typeof type !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid category or type parameter" });
    }

    // Get the start and end of today

    // Fetch all tasks matching the given categoryId and type
    const tasks = await Task.findAll({
      where: { categoryId, type },
      attributes: [
        "id",
        "title",
        "description",
        "categoryId",
        "snabelRed",
        "snabelBlue",
        "snabelYellow",
        "xp",
        "kind",
        "timeToDo",
        "type",
      ],
      raw: true,
    });

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({
          message: "No tasks found for today in the given category and type",
        });
    } else {
      return res.status(200).json({ data: tasks });
    }
  } catch (error) {
    console.error("Error in appearTaskesTypeandCategory:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const addPros = async (req: Request, res: Response) => {
  try {
    // Extract user data
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) return res.status(404).json({ message: "User data not found in request" });

    // Find teacher linked to user
    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    if (!teacher) return res.status(404).json({ message: "Teacher data not found in request" });

    // Extract request data
    let { taskId, studentIds, comment = "", time } = req.body;

    // Validate taskId
    if (typeof taskId !== "number") return res.status(400).json({ message: "Invalid taskId parameter" });

    // Convert single studentId to an array if needed
    studentIds = Array.isArray(studentIds) ? studentIds : [studentIds];

    if (!studentIds.every((id: number) => typeof id === "number" && !isNaN(id))) {
      return res.status(400).json({ message: "Invalid studentIds parameter" });
    }

    // Validate time format (HH:mm)
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ message: "Invalid time format, expected HH:mm" });
    }

    // Set today's date with adjusted time
    const today = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    today.setHours(hours + 2, minutes, 0, 0); 

    // Fetch students who already completed the task today
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
      } as any, // Explici
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

    // Update students and their challenges in a single loop
    for (const studentId of newStudentIds) {
      // Create student task record
      await StudentTask.create({
        studentId,
        taskId,
        completionStatus: "Completed",
        comment,
        createdAt: today,
        teacherId : teacher.id,
      });

      // Fetch student record
      const student = await Student.findOne({ where: { id: studentId } });
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
        } else if (challenge.taskCategory ===  task.taskCategory.title|| challenge.category === "alltask") {
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

    return res.status(201).json({
      message: "Student tasks recorded successfully",
    });
  } catch (error) {
    console.error("Error in addPros:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const appearStudentInDetails = async (req: Request, res: Response) => {
  try {
    // Extract user data
    const user = (req as Request & { user: JwtPayload | undefined }).user;
    if (!user) return res.status(404).json({ message: "User data not found in request" });

    // Find teacher linked to user
    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    if (!teacher) return res.status(404).json({ message: "Teacher data not found in request" });
    
    const studentId = Number(req.params.studentId);
    if (!studentId) return res.status(400).json({ message: "Student ID is required" });
    const student = await Student.findOne({
      where: { id: studentId },
    
      include: [{
        model: User,
        as: "user", // use the alias defined in the association
        attributes: ["firstName", "lastName", "email"],
      },
      {model: Class,
        as: "class",
        attributes: ["id", "classname",'category'],
      }
      ,{model: Organization,
        as: "organization",
        attributes: ["id", "name"],
      }

    ],}
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    const allCategories = await TaskCategory.findAll({
          attributes: ["id", "title"], // ✅ Get categoryId and title
          raw: true,
        });
    
        // Fetch completed task counts grouped by categoryId
        const completedTasks = await Student.sequelize.query(
          `
          SELECT COUNT(studenttasks.taskId) AS count, tasks.categoryId, taskcategories.title
          FROM studenttasks
          INNER JOIN tasks ON studenttasks.taskId = tasks.id
          INNER JOIN taskcategories ON tasks.categoryId = taskcategories.id
          WHERE studenttasks.studentId = :studentId
          AND studenttasks.completionStatus = 'Completed'
          GROUP BY tasks.categoryId, taskcategories.title
          `,
          {
            replacements: { studentId: student.id },
            type: QueryTypes.SELECT,
          }
        );
    
        // Convert the query result into an object mapping category titles to counts
        const categoryCounts = completedTasks.reduce((acc: Record<string, number>, row: any) => {
          acc[row["title"]] = Number(row["count"]) || 0;
          return acc;
        }, {} as Record<string, number>);
    
        // Ensure all unique categories appear in the final response (even if count is 0)
        const finalCategoryCounts = allCategories.reduce((acc, category) => {
          acc[category.title] = categoryCounts[category.title] || 0;
          return acc;
        }, {} as Record<string, number>);
    
        // Calculate total completed tasks
        const totalCompletedTasks = (Object.values(finalCategoryCounts) as number[]).reduce(
          (sum: number, count: number) => sum + count,
          0
        );
        return res.status(200).json({
          student,
          totalCompletedTasks,
          categoryCounts: finalCategoryCounts,
        });
  }
  
  catch (error) {
    console.error("Error in appearStudentInDetails:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const teacherData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  try {
    const teacher = await Teacher.findOne({
      where: { userId: user.id },
      include: [{
        model: User,
        as: "user", // use the alias defined in the association
      },
      
    ]
     
    });
    if (!teacher) {
      return res.status(404).json({ message: "User or Student not found" });
    } else {

      res.status(200).json({ data: teacher });
    }
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ message: "Error fetching teacher data" });
  }
};

const updateDataTeacher = async (req: Request, res: Response) => {
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
};


const deleteData = async (req: Request, res: Response) => {
  const user = (req as Request & { user: JwtPayload | undefined }).user;

  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }

  const teacher = await Teacher.findOne({ where: { userId: user.id } });
  const userRecord = await User.findOne({ where: { id: user.id } });
  if (!teacher || !userRecord) {
    return res.status(404).json({ message: "User or Student not found" });
  }


  // Delete student first, then delete user
  await teacher.destroy();
  await userRecord.destroy();


  res
    .status(200)
    .json({ message: "User and Student data deleted successfully" });
};

export {
  appearStudent,
  appearclass,
  appearStudentByclass,
  appearStudentWithoutClassOrganizationName,
  createClass,
  appearTaskesTypeandCategories,
  addPros,
  appearStudentInDetails,
  teacherData,
  updateDataTeacher,
  deleteData,
  addStudentToClass
};
