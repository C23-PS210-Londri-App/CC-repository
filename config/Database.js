import { Sequelize } from "sequelize";
import dotenv from "dotenv";


const db = new Sequelize ('db-test', 'root','londri',{
    host:"34.101.218.5",
    dialect:"mysql"
});

export default db;