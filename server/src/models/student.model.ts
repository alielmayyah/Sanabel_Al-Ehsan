import { Sequelize, DataTypes, CreationOptional, Model } from "@sequelize/core";
import User from "./user.model";
import Parent from "./parent.model";
import Organization from "./oraganization.model";
import Class from "./class.model";

export enum Grade {
  primary = "primary",
  preparatory = "preparatory",
  secondary = "secondary",
}
class Student extends Model {
  declare id: CreationOptional<number>;
  declare classId: CreationOptional<number>;
  declare parentId: CreationOptional<number>;
  declare organizationId: CreationOptional<number>; // This is the correct foreign key for Organization
  declare points: CreationOptional<number>;
  declare studentId: CreationOptional<number>; // Foreign key to the User model
  declare userId: CreationOptional<number>; // Add userId field
  declare user: User | null;
  declare profileImg: CreationOptional<number>;

  static initModel(sequelize: Sequelize) {
    Student.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        grade: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        points: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        profileImg: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Student",
        timestamps: true,
      }
    );
  }
}

export default Student;
