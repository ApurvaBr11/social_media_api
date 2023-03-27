import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => app.listen(process.env.PORT, () => console.log("started"))).catch((error)=>console.log(error));


app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
