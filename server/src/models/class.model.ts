// models/class.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import User from "./user.model";
import Organization from "./oraganization.model";

class Class extends Model {
  declare id: CreationOptional<number>;
  declare classname: CreationOptional<String>; // Name of the class
  declare organizationId: CreationOptional<number>; // Reference to the Organization
  declare classdescrption: CreationOptional<String>; // Description of the class
  declare category: CreationOptional<String>; // Category of the class

  static initModel(sequelize: Sequelize) {
    Class.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        classname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        classdescrption: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
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
