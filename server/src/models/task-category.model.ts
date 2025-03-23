import { Sequelize, DataTypes, Model } from "@sequelize/core";
import Task from "./task.model";

class TaskCategory extends Model {
  declare id: number;
  declare title: string;
  declare description: string;

  static initModel(sequelize: Sequelize) {
    TaskCategory.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "TaskCategory",
        timestamps: true,
      }
    );
  }

  static associate() {
    TaskCategory.hasMany(Task, {
      foreignKey: "categoryId",
      as: "tasks",
    });
  }
}

export default TaskCategory;
