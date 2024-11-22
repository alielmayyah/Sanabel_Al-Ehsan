"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/donation.model.ts
const core_1 = require("@sequelize/core");
class Donation extends core_1.Model {
    static initModel(sequelize) {
        Donation.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            amount: {
                type: core_1.DataTypes.FLOAT,
                allowNull: false,
            },
            receiptImage: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "Donation",
            timestamps: true,
        });
    }
}
exports.default = Donation;
