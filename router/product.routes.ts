import { Router } from "express";
import { getAllProducts, getOneProduct, addProduct, updateProduct, deleteProduct, likeProduct, unlikeProduct } from "../controller/product.ctr.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const productRouter: Router = Router()

productRouter.get("/get_all_products", getAllProducts)
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", authMiddleware, upload.single("product_img"), addProduct)
productRouter.put("/update_product/:id", authMiddleware, upload.single("product_img"), updateProduct)
productRouter.delete("/delete_product/:id", authMiddleware, deleteProduct)
productRouter.post("/like_product/:id", authMiddleware, likeProduct)
productRouter.post("/unlike_product/:id", authMiddleware, unlikeProduct)

export default productRouter