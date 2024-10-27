import { Sequelize, DataTypes, CreationOptional, Model } from "@sequelize/core";
import User from "./user.model";
import Parent from "./parent.model";
import Organization from "./oraganization.model";
import Class from "./class.model";

class Student extends Model {
  declare id: CreationOptional<number>;
  declare age: number;
  declare classId: CreationOptional<number>;
  declare parentId: CreationOptional<number>;
  declare organizationId: number; // This is the correct foreign key for Organization
  declare points: CreationOptional<number>;
  declare studentId: CreationOptional<number>; // Foreign key to the User model
  declare userId: number; // Add userId field
  declare user: User | null;

  static initModel(sequelize: Sequelize) {
    Student.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        points: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
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
