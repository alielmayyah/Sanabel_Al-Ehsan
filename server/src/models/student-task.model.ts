import {
  Sequelize,
  DataTypes,
  Model,
  CreationOptional,
  ValidationError,
} from "@sequelize/core";
import Student from "./student.model";
import Task from "./task.model";
import Parent from "./parent.model";
import Teacher from "./teacher.model";

enum CompletionStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
}

class StudentTask extends Model {
  declare id: number;
  declare studentId: number;
  declare taskId: number;
  declare completionStatus: string;
  declare comment: CreationOptional<string>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare date: string;
  declare parentId: number | null;
  declare teacherId: number | null;
  declare studentAssigned: boolean;

  static associate(models: any) {
    StudentTask.belongsTo(models.Student, {
      foreignKey: { name: "studentId", allowNull: false },
      as: "Student",
    });

    StudentTask.belongsTo(models.Task, {
      foreignKey: { name: "taskId", allowNull: false },
      as: "Task",
    });

    StudentTask.belongsTo(models.Parent, {
      foreignKey: { name: "parentId", allowNull: true },
      as: "Parent",
    });

    StudentTask.belongsTo(models.Teacher, {
      foreignKey: { name: "teacherId", allowNull: true },
      as: "Teacher",
    });
  }

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
        parentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: Parent, key: "id" },
        },
        teacherId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: Teacher, key: "id" },
        },
        studentAssigned: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completionStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: CompletionStatus.NotCompleted,
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
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_DATE"),
        },
      },
      {
        sequelize,
        modelName: "StudentTask",
        tableName: "StudentTasks",
        timestamps: true,
        indexes: [
          {
            name: "StudentTasks_studentId_taskId_unique",
            fields: ["studentId", "taskId"],
            unique: false, // ✅ avoid index conflict
          },
        ],
        hooks: {
          beforeValidate: (task: StudentTask) => {
            const assignerCount =
              Number(!!task.parentId) +
              Number(!!task.teacherId) +
              Number(task.studentAssigned);

            if (assignerCount !== 1) {
              throw new ValidationError(
                "Exactly one assigner must be specified: parentId, teacherId, or studentAssigned."
              );
            }
          },
        },
      }
    );
  }
}

export default StudentTask;
