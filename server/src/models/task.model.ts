// models/task.model.ts
import { Sequelize, DataTypes, Model, CreationOptional } from "@sequelize/core";



class Task extends Model {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare category: string;
  declare points: number;


  static initModel(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: { 
          type: DataTypes.STRING,
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        category: {
          type: DataTypes.STRING,
          allowNull: true,
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
        kind: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        timeToDo: {
          type: DataTypes.TIME,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Task",
        timestamps:false,
      }
    );
  }
}

export default Task;
