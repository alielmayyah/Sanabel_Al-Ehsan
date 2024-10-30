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

export enum UserGenre {
  Male = "Male",
  Female = "Female",
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: CreationOptional<string>;
  declare lastName: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare role: CreationOptional<UserRole>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare token: CreationOptional<string>;
  declare resetOTP: CreationOptional<string> | null;
  declare otpExpiry: CreationOptional<Date> | null;
  declare otpVerified: CreationOptional<boolean>;
  declare genre: CreationOptional<String>;
  declare dateOfBirth: CreationOptional<Date>;
  declare isAccess: CreationOptional<Boolean>;
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
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
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(UserRole)),
          allowNull: false,
          defaultValue: "Student",
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        resetOTP: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        otpExpiry: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        otpVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dateOfBirth: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        isAccess: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
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
