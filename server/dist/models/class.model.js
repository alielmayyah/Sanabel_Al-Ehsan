"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/class.model.ts
const core_1 = require("@sequelize/core");
class Class extends core_1.Model {
    static initModel(sequelize) {
        Class.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            classname: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            classdescrption: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            category: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Class",
            timestamps: true,
        });
    }
}
exports.default = Class;
