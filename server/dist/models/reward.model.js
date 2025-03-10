"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardType = void 0;
// models/reward.model.ts
const core_1 = require("@sequelize/core");
var RewardType;
(function (RewardType) {
    RewardType["Virtual"] = "Virtual";
    RewardType["Physical"] = "Physical";
})(RewardType || (exports.RewardType = RewardType = {}));
class Reward extends core_1.Model {
    static initModel(sequelize) {
        Reward.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            type: {
                type: core_1.DataTypes.ENUM(...Object.values(RewardType)),
                allowNull: false,
            },
            pointsRequired: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Reward",
            timestamps: true,
        });
    }
}
exports.default = Reward;
