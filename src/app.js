import express from "express"
import mongoose from "mongoose"

import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/happyweekend")
    .then(() => console.log("connect db thanh cong"))
    .catch((error) => console.log(error))

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
}); 