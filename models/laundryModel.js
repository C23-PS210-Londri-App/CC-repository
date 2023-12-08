import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";
const { DataTypes } = Sequelize;
const Laundrys = db.define(
    "laundry",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `laundry-${nanoid(8)}`,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: true,
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
      photo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  

export default Laundrys;