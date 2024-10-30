import { Sequelize, DataTypes, CreationOptional, Model } from "@sequelize/core";
import User from "./user.model";

class Parent extends Model {
  declare id: CreationOptional<number>;
  declare contactInfo: string;
  declare parentId: CreationOptional<number>; // Explicit parentId field as a foreign key
  declare userId: number; // Add userId field
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
        contactInfo: {
          type: DataTypes.STRING,
          allowNull: false,
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