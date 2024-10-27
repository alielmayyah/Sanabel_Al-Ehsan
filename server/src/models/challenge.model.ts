// models/challenge.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";

class Challenge extends Model {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare points: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Challenge.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Challenge",
        timestamps: true,
      }
    );
  }
}

export default Challenge;
