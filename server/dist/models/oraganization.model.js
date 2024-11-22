"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationType = void 0;
// models/organization.model.ts
const core_1 = require("@sequelize/core");
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["School"] = "School";
    OrganizationType["Company"] = "Company";
    OrganizationType["Charity"] = "Charity";
})(OrganizationType || (exports.OrganizationType = OrganizationType = {}));
class Organization extends core_1.Model {
    static initModel(sequelize) {
        Organization.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            type: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "School",
            },
            img: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "Organization",
            timestamps: true,
        });
    }
}
exports.default = Organization;
