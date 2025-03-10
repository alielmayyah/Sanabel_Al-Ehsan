"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
class Teacher extends core_1.Model {
    static initModel(sequelize) {
        Teacher.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            sequelize,
            modelName: "Teacher",
            timestamps: true,
        });
    }
}
exports.default = Teacher;
