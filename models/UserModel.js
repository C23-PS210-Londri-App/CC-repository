import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { nanoid } from "nanoid";

const { DataTypes } = Sequelize;

const Users = db.define(
    "customer",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `user-${nanoid(8)}`,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  

export default Users;