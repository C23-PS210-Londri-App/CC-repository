import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";
import Laundrys from "./laundryModel.js";
import Users from "./userModel.js";
import Layanan from "./layananModel.js";

const { DataTypes } = Sequelize;
const Order = db.define(
    "order",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `layanan-${nanoid(8)}`,
      },
      orderTrx: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estimasi_berat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      catatan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

Users.hasMany(Order, {
    foreignKey: "id_customer"
  })

Laundrys.hasMany(Order, {
    foreignKey: "id_laundry"
})

Order.belongsTo(Layanan,{
    foreignKey: "id_layanan"
})

export default Order;