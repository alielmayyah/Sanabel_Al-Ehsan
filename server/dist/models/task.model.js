"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategory = void 0;
// models/task.model.ts
const core_1 = require("@sequelize/core");
var TaskCategory;
(function (TaskCategory) {
    TaskCategory["Daily"] = "Daily";
    TaskCategory["Weekly"] = "Weekly";
    TaskCategory["Monthly"] = "Monthly";
})(TaskCategory || (exports.TaskCategory = TaskCategory = {}));
class Task extends core_1.Model {
    static initModel(sequelize) {
        Task.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: core_1.DataTypes.ENUM(...Object.values(TaskCategory)),
                allowNull: false,
            },
            points: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Task",
            timestamps: true,
        });
    }
}
exports.default = Task;
