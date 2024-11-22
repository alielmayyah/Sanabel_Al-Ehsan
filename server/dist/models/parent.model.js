"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
class Parent extends core_1.Model {
    static initModel(sequelize) {
        Parent.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            sequelize,
            modelName: "Parent",
            timestamps: true,
        });
    }
}
exports.default = Parent;
