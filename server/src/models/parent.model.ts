import { Sequelize, DataTypes, CreationOptional, Model } from "@sequelize/core";
import User from "./user.model";

class Parent extends Model {
  declare id: CreationOptional<number>;
  declare contactInfo: CreationOptional<string>;
  declare parentId: CreationOptional<number>; // Explicit parentId field as a foreign key
  declare userId: CreationOptional<number>; // Add userId field
  declare user: User | null;

  static initModel(sequelize: Sequelize) {
    Parent.init(
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
        modelName: "Parent",
        timestamps: true,
      }
    );
  }
}

export default Parent;
