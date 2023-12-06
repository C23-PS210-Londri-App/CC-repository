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
      cuci: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      setrika: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      komplit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      komplit_kilat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      lainnya: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      latitude: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat_generete: {
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
  

export default Laundrys;