"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
class User extends core_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            First_name: {
                type: core_1.DataTypes.STRING,
                allowNull: true, // Ensure first name is not null
            },
            Last_name: {
                type: core_1.DataTypes.STRING,
                allowNull: true, // Ensure last name is not null
            },
            age: {
                type: core_1.DataTypes.INTEGER,
                allowNull: true, // Ensure age is not null
            },
            email: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensure email is not null
                validate: {
                    isEmail: true,
                    // Validate that the email is in a valid format
                },
            },
            role: {
                type: core_1.DataTypes.STRING,
                allowNull: true, // Ensure role is not null
            },
            password: {
                type: core_1.DataTypes.STRING,
                allowNull: false, // Ensure password is not null
            },
            token: {
                type: core_1.DataTypes.STRING,
                allowNull: true, // Allow null because token is not set initially
            },
            createdAt: {
                type: core_1.DataTypes.DATE(6),
                allowNull: false,
                defaultValue: core_1.DataTypes.NOW, // Automatically set the current date/time
            },
            updatedAt: {
                type: core_1.DataTypes.DATE(6),
                allowNull: false,
                defaultValue: core_1.DataTypes.NOW, // Automatically set the current date/time
            },
        }, {
            sequelize,
            modelName: "User",
            timestamps: true, // Use automatic timestamps
        });
    }
}
exports.default = User;
