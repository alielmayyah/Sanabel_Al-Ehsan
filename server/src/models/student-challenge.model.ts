import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import Student from "./student.model";
import Task from "./task.model";
import Challenge from "./challenge.model";

export enum CompletionStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
}

class StudentChallenge extends Model {
  declare studentId: number;
  declare student: Student;
  
  declare challengeId: number;
  declare completionStatus: CompletionStatus; // ✅ Use enum properly
  declare comment: CreationOptional<string>;
  declare date: CreationOptional<Date>;
  declare pointOfStudent: number;
  declare challenge: Challenge; // Optional association with Task model

  static initModel(sequelize: Sequelize) {
    StudentChallenge.init(
      {
        completionStatus: {
          type: DataTypes.ENUM(...Object.values(CompletionStatus)), // ✅ Use ENUM
          allowNull: false,
          defaultValue: CompletionStatus.NotCompleted,
        },

        comment: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        pointOfStudent: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
      },
      {
        sequelize,
        modelName: "StudentChallenge",
        timestamps: true,
      }
    );
  }
}

export default StudentChallenge;
