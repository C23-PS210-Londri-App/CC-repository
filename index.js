const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/Database');
// const Users = require("./models/UserModel.js");
const router = require('./routes/index');

dotenv.config();
const app = express();

async function startServer() {
  try {
    await db.authenticate();
    console.log('Database Connected....');
    //   await db.sync()
  } catch (error) {
    console.error(error);
  }

  app.use(cookieParser());
  app.use(express.json());
  app.use(router);

  app.listen(5000, () => console.log('Server Listening at port 5000'));
}

startServer();
