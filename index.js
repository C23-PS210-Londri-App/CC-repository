import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import db from "./config/Database.js";
import cors from "cors"
import router from "./routes/index.js";

dotenv.config();
const app = express();

async function startServer() {
  try {
    await db.authenticate();
    console.log('Database Connected....');
      // await db.sync()
  } catch (error) {
    console.error(error);
  }

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);
  const port = process.env.SERVER_PORT
  app.listen(port, () => console.log(`Server Listening at port ${port}`));
}

startServer();
