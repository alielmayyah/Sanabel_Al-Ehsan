// models/student-task.model.ts
import { Sequelize, DataTypes, Model } from "@sequelize/core";
import Student from "./student.model";
import Task from "./task.model";

enum CompletionStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
}
class StudentTask extends Model {
  declare studentId: number;
  declare taskId: number;
  declare completionStatus: CompletionStatus; // Add completion status field

  static initModel(sequelize: Sequelize) {
    StudentTask.init(
      {},
      {
        sequelize,
        modelName: "StudentTask",
        timestamps: false, // Not necessary for junction tables
      }
    );
  }
}

export default StudentTask;
