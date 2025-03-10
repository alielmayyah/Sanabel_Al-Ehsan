"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/class.model.ts
const core_1 = require("@sequelize/core");
class Groupe extends core_1.Model {
    static initModel(sequelize) {
        Groupe.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            groupename: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            groupedescrption: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "Groupe",
            timestamps: true,
        });
    }
}
exports.default = Groupe;
