// models/tree.model.ts
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";

class Tree extends Model<InferAttributes<Tree>, InferCreationAttributes<Tree>> {
  declare id: CreationOptional<number>;
  declare level: CreationOptional<number>;
  declare water: CreationOptional<number>;
  declare seeders: CreationOptional<number>;
  declare stage: CreationOptional<number>;
  declare treeProgress: CreationOptional<number>;

  static initModel(sequelize: Sequelize) {
    Tree.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        water: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        seeders: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        treeProgress: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        stage: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Tree",
        timestamps: false,
      }
    );
  }
}

export default Tree;
