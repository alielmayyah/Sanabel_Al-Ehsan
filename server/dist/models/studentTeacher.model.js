"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/studentTeacher.model.ts
const core_1 = require("@sequelize/core");
class StudentTeacher extends core_1.Model {
    static initModel(sequelize) {
        StudentTeacher.init({}, {
            sequelize,
            modelName: "StudentTeacher",
            timestamps: true,
        });
    }
}
exports.default = StudentTeacher;
