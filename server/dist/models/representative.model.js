"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/representative.model.ts
const core_1 = require("@sequelize/core");
class Representative extends core_1.Model {
    static initModel(sequelize) {
        Representative.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            sequelize,
            modelName: "Representative",
            timestamps: true,
        });
    }
}
exports.default = Representative;
