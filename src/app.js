import express from "express";
import mongoose from "mongoose";
import { readdirSync } from "fs";
import CategoryRouter from "./router/catrgories";
import RoomRouter from "./router/rooms";

import StatusRoom from "./router/statusroom";

import User from "./router/users";
import OrderRouter from "./router/order";
import AuthRouter from "./router/auth";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// c1
// app.use("/api",CategoryRouter)
// app.use("/api",RoomRouter)
// app.use("/api",User)

// app.use("/api",StatusRoom)
// app.use("/api",OrderRouter)
// app.use("/api", )

// c2
// readdirSync("./src/router").forEach((route) => {
//   app.use("/api", require(`./router/${route}`));
// });

// mongoose
//   .connect("mongodb://localhost:27017/happyweekend")
//   .then(() => console.log("connect db thanh cong"))
//   .catch((error) => console.log(error));

// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`Server running port ${PORT}`);
// });





const URL = 'mongodb+srv://admin:sang2002@happyweekend.e5gnq2j.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(URL)
  .then(() => console.log("DB Connected successfully"))
  .catch((error) => console.log("DB not connected ", error));

  readdirSync("./src/router").forEach((route) => {
    // console.log(route);
    app.use("/api", require(`./router/${route}`));
  });

  app.listen(4000, () => console.log("server is listening port: ", 4000));