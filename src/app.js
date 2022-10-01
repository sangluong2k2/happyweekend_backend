import express from "express"
import mongoose from "mongoose"
import CategoryRouter from './router/catrgories'
import RoomRouter from './router/rooms'
import User from './router/users'
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api",CategoryRouter)
app.use("/api",RoomRouter)
app.use("/api",User)

mongoose.connect("mongodb://localhost:27017/happyweekend")
    .then(() => console.log("connect db thanh cong"))
    .catch((error) => console.log(error))

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
}); 