import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.config";

const app: Express = express();

app
  .listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
    connectDB();
  })
  .on("error", (e) => {
    console.log(e);
  });
