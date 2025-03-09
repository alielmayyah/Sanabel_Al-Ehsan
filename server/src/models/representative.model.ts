// models/representative.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import User from "./user.model";
import Organization from "./oraganization.model";
class Representative extends Model {
  declare organizationId: number;
  declare id: CreationOptional<number>;
  declare user: User | undefined;
  static initModel(sequelize: Sequelize) {
    Representative.init(
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
        modelName: "Representative",
        timestamps: true,
      }
    );
  }
}

export default Representative;
