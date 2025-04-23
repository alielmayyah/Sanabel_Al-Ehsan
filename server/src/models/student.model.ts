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
  declare class: Class | null;
  declare ParentId: CreationOptional<number>;
  declare organization: Organization | null;
  declare connectCode: String;

  declare organizationId: CreationOptional<number>; // This is the correct foreign key for Organization
  declare xp: CreationOptional<number>;
  declare studentId: CreationOptional<number>; // Foreign key to the User model
  declare userId: CreationOptional<number>; // Add userId field
  declare user: User | null;
  declare profileImg: CreationOptional<number>;
  declare water: CreationOptional<number>;
  declare seeders: CreationOptional<number>;
  declare snabelRed: CreationOptional<number>;
  declare snabelBlue: CreationOptional<number>;
  declare snabelYellow: CreationOptional<number>;
  
  declare treeProgress: CreationOptional<number>;
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
        medal: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          validate: {
            min: 0,
          },
        },
        connectCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        seeders: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        water: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        snabelRed: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        snabelYellow: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        snabelBlue: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        level: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            min: 0,
          },
        },
        xp: {
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
        modelName: "Student",
        timestamps: true,
      }
    );
  }
}

export default Student;
