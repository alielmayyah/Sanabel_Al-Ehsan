"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/challenge.model.ts
const core_1 = require("@sequelize/core");
class Challenge extends core_1.Model {
    static initModel(sequelize) {
        Challenge.init({
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
            points: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Challenge",
            timestamps: true,
        });
    }
}
exports.default = Challenge;
