"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/student-task.model.ts
const core_1 = require("@sequelize/core");
var CompletionStatus;
(function (CompletionStatus) {
    CompletionStatus["Completed"] = "Completed";
    CompletionStatus["NotCompleted"] = "NotCompleted";
})(CompletionStatus || (CompletionStatus = {}));
class StudentTask extends core_1.Model {
    static initModel(sequelize) {
        StudentTask.init({
            completionStatus: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "NotCompleted",
            },
            comment: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: core_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "StudentTask",
            timestamps: false, // Not necessary for junction tables
        });
    }
}
exports.default = StudentTask;
