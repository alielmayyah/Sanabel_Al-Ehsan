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
  declare role: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare resetOTP: CreationOptional<string> | null;
  declare otpExpiry: CreationOptional<Date> | null;
  declare otpVerified: CreationOptional<boolean>;
  declare gender: CreationOptional<String>;
  declare dateOfBirth: CreationOptional<Date>;
  declare profileImg: CreationOptional<string>;
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
          allowNull: true,
          defaultValue: "Student",
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
        gender: {
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
        profileImg: {
          type: DataTypes.STRING,
          allowNull: true,
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
