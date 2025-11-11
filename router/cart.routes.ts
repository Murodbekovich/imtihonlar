import { Router } from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controller/card.ctr.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const cartRouter: Router = Router()

cartRouter.get("/get_cart", authMiddleware, getCart)
cartRouter.post("/add_to_cart", authMiddleware, addToCart)
cartRouter.put("/update_cart_item/:id", authMiddleware, updateCartItem)
cartRouter.delete("/remove_from_cart/:id", authMiddleware, removeFromCart)
cartRouter.delete("/clear_cart", authMiddleware, clearCart)

export default cartRouter