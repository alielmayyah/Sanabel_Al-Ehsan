// models/task.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";

export enum TaskCategory {
  Daily = "Daily",
  Weekly = "Weekly",
}

class Task extends Model {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare category: TaskCategory;
  declare points: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Task.init(
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
        category: {
          type: DataTypes.ENUM(...Object.values(TaskCategory)),
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Task",
        timestamps: true,
      }
    );
  }
}

export default Task;
