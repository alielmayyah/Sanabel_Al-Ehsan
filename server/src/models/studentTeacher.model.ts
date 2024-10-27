// models/studentTeacher.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import Student from "./student.model";
import Teacher from "./teacher.model";
class StudentTeacher extends Model {
  declare studentId: number;
  declare teacherId: number;

  static initModel(sequelize: Sequelize) {
    StudentTeacher.init(
      {
      },
      {
        sequelize,
        modelName: "StudentTeacher",
        timestamps: true,
      }
    );
  }
}

export default StudentTeacher;
