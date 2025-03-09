import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";
import Task from "./task.model"; // Import Task model

class Challenge extends Model {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare xp: number;
  declare snabelBlue: number;
  declare snabelYellow: number;
  declare snabelRed: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare level: CreationOptional<number>;
  declare taskId: number | null; // Foreign key to Task (optional)

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
          allowNull: true,
        },
        level: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
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
        xp: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
        point: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            min: 0,
          },
        },
        taskId: {
          type: DataTypes.INTEGER,
          allowNull: true, // Optional relationship
          references: {
            model: Task, // References Task model
            key: "id",
          },
          onDelete: "SET NULL", // Task deletion sets taskId to null
          onUpdate: "CASCADE", // Task updates propagate to this foreign key
        },
      },
      {
        sequelize,
        modelName: "Challenge",
        timestamps: true,
      }
    );
  }

  // Define associations
  static associate() {
    Challenge.belongsTo(Task, {
      foreignKey: "taskId",
      as: "task",
    });
  }
}

export default Challenge;
