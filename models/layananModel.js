import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { nanoid } from "nanoid";
import Laundrys from "./laundryModel.js";

const { DataTypes } = Sequelize;
const Layanan = db.define(
    "layanan",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `layanan-${nanoid(4)}`,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Laundrys.hasMany(Layanan, {
    foreignKey: "id_laundry"
  })
export default Layanan;