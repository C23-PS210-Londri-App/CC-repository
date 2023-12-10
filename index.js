import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import cors from "cors"
// import Laundrys from "./models/laundryModel.js";
// import Layanan from "./models/layananModel.js";
// import Order from "./models/orderModel.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

async function startServer() {
  try {
    await db.authenticate();
    console.log('Database Connected....');
      await db.sync()
  } catch (error) {
    console.error(error);
  }

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);
  const port = 5000
  app.listen(port, () => console.log(`Server Listening at port ${port}`));
}

startServer();
