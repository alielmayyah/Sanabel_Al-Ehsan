// models/class.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import User from "./user.model";
import Organization from "./oraganization.model";

class Class extends Model {
  declare id: CreationOptional<number>;
  declare classId: CreationOptional<number>; // Unique ID for Class, separate from User ID
  declare className: string; // Name of the class
  declare organizationId: number; // Reference to the Organization
  declare user: User | null;

  static initModel(sequelize: Sequelize) {
    Class.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "Class",
        timestamps: true,
      }
    );
  }
}

export default Class;
