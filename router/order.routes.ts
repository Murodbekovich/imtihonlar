import { Router } from "express";
import { createOrder, getUserOrders, getOrder, processPayment } from "../controller/order.ctr.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const orderRouter: Router = Router()

orderRouter.post("/create_order", authMiddleware, createOrder)
orderRouter.get("/get_user_orders", authMiddleware, getUserOrders)
orderRouter.get("/get_order/:id", authMiddleware, getOrder)
orderRouter.post("/process_payment", authMiddleware, processPayment)

export default orderRouter