"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
const core_1 = require("@sequelize/core");
var Grade;
(function (Grade) {
    Grade["primary"] = "primary";
    Grade["preparatory"] = "preparatory";
    Grade["secondary"] = "secondary";
})(Grade || (exports.Grade = Grade = {}));
class Student extends core_1.Model {
    static initModel(sequelize) {
        Student.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            grade: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            points: {
                type: core_1.DataTypes.INTEGER,
                defaultValue: 0,
            },
            connectOtp: {
                type: core_1.DataTypes.INTEGER,
                allowNull: true,
            },
            otpExpiry: {
                type: core_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "Student",
            timestamps: true,
        });
    }
}
exports.default = Student;
