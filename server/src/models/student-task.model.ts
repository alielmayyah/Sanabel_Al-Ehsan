// models/student-task.model.ts
import { Sequelize, DataTypes, Model, CreationOptional, Op, col, fn } from "@sequelize/core";
import Student from "./student.model";
import Task from "./task.model";

enum CompletionStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
}

class StudentTask extends Model {
  declare id: number;
  declare studentId: number;
  declare taskId: number;
  declare completionStatus: CompletionStatus;
  declare comment: CreationOptional<string>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare date: string; // ✅ New column for storing date without time

  static initModel(sequelize: Sequelize) {
    StudentTask.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: Student, key: "id" },
        },
        taskId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: Task, key: "id" },
        },
        completionStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "NotCompleted",
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        date: {
          type: DataTypes.DATEONLY, // ✅ Stores only the date (without time)
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_DATE"), // ✅ Auto-filled with today's date
        },
      },
      {
        sequelize,
        modelName: "StudentTask",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["studentId", "taskId", "date"], // ✅ Ensures uniqueness per day
          },
        ],
      }
    );
  }

  // ✅ Ensure a student cannot be assigned the same task on the same day
  static async canAssignTask(studentId: number, taskId: number, date: string) {
    const existingTask = await StudentTask.findOne({
      where: {
        studentId,
        taskId,
        date, // ✅ Checks against the new date column
      },
    });
    return !existingTask;
  }
}

export default StudentTask;
