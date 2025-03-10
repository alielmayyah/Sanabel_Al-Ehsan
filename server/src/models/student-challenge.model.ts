// models/student-task.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import Student from "./student.model";
import Task from "./task.model";

enum CompletionStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
}
class StudentChallenge extends Model {
  declare studentId: number;
  declare challengeId: number;
  declare completionStatus: CompletionStatus; // Add completion status field
  declare comment: CreationOptional<String>;

  static initModel(sequelize: Sequelize) {
    StudentChallenge.init(
      {
        completionStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "NotCompleted",
        },

        comment: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        pointOfSutdent: {
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
        timestamps: true, // Not necessary for junction tables
      }
    );
  }
}

export default StudentChallenge;
