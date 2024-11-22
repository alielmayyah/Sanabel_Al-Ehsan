"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGenre = exports.UserRole = void 0;
// models/user.model.ts
const core_1 = require("@sequelize/core");
var UserRole;
(function (UserRole) {
    UserRole["Parent"] = "Parent";
    UserRole["Teacher"] = "Teacher";
    UserRole["Student"] = "Student";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserGenre;
(function (UserGenre) {
    UserGenre["Male"] = "Male";
    UserGenre["Female"] = "Female";
})(UserGenre || (exports.UserGenre = UserGenre = {}));
class User extends core_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            lastName: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: core_1.DataTypes.ENUM(...Object.values(UserRole)),
                allowNull: true,
            },
            token: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            resetOTP: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            otpExpiry: {
                type: core_1.DataTypes.DATE,
                allowNull: true,
            },
            otpVerified: {
                type: core_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            genre: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            dateOfBirth: {
                type: core_1.DataTypes.DATEONLY,
                allowNull: true,
            },
            isAccess: {
                type: core_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            profileImg: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "User",
            timestamps: true,
        });
    }
}
exports.default = User;
