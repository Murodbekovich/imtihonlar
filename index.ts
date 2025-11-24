import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import studentRouter from "./router/student.routes.ts";

const app = express()
dotenv.config()
app.use(cors({origin: "*"}))
app.use(express.json())
const PORT = process.env.PORT || 3000

// Router
app.use(studentRouter)

app.listen(PORT, () => {
    console.log("Server is running at:", PORT);
})