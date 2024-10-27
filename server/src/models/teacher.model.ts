import { Sequelize, DataTypes, CreationOptional, Model } from "@sequelize/core";
import User from "./user.model";
import Organization from "./oraganization.model";
class Teacher extends Model {
  declare id: CreationOptional<number>;
  declare subject: string;
  declare organizationId: number;
  declare teacherId: CreationOptional<number>; // Explicit teacherId field as a foreign key
  declare user: User | null;

  static initModel(sequelize: Sequelize) {
    Teacher.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        subject: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Teacher",
        timestamps: true,
      }
    );
  }
}

export default Teacher;
