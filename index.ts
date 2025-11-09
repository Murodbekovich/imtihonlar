import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import productRouter from "./router/product.routes.ts";

const app = express()
dotenv.config()
app.use(cors({origin: "*"}))
app.use(express.json())
const PORT = process.env.PORT || 3000

// Router
app.use(productRouter)

app.listen(PORT, () => {
    console.log("Server is running at:", PORT);
})