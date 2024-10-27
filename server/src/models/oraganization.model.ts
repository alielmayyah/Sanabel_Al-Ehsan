// models/organization.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import User from "./user.model";

export enum OrganizationType {
  School = "School",
  Company = "Company",
  Charity = "Charity",
}

class Organization extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare type: OrganizationType;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user: User | null;
  static initModel(sequelize: Sequelize) {
    Organization.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },

        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(...Object.values(OrganizationType)),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Organization",
        timestamps: true,
      }
    );
  }
}

export default Organization;
