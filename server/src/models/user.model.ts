// models/user.model.ts
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";

export enum UserRole {
  Parent = "Parent",
  Teacher = "Teacher",
  Student = "Student",
  Organization = "Organization",
  Representative = "Representative",
  Class = "Class",
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare Name: string;
  declare email: string;
  declare password: string;
  declare role: UserRole;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare token: CreationOptional<string>;
  declare resetOTP: CreationOptional<string> | null;
  declare otpExpiry: CreationOptional<Date> | null;
  declare otpVerified: CreationOptional<boolean>;
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(UserRole)),
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        resetOTP: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        // OTP expiry time
        otpExpiry: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        otpVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        timestamps: true,
      }
    );
  }
}

export default User;
