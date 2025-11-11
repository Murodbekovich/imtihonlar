import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import productRouter from "./router/product.routes.js"
import authRouter from "./router/auth.routes.js"
import cartRouter from "./router/cart.routes.js"
import categoryRouter from "./router/category.routes.js"
import orderRouter from "./router/order.routes.js"


const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()


// router
app.use(productRouter)
app.use(authRouter)
app.use(cartRouter)
app.use(categoryRouter)
app.use(orderRouter)

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log("Server is running at:", PORT)
})