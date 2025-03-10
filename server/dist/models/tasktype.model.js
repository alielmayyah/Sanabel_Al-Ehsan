"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/TaskType.model.ts
const core_1 = require("@sequelize/core");
class TaskType extends core_1.Model {
    static initModel(sequelize) {
        TaskType.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "TaskType",
            timestamps: true,
        });
    }
}
exports.default = TaskType;
