import { Router, type RequestHandler } from "express";
import { addProduct, DeleteProduct, getAllproducts, getOneProduct, updateProduct } from "../controller/product.ctr.ts";

const productRouter: Router = Router()

productRouter.get("/get_all_products", getAllproducts as RequestHandler)
productRouter.get("/get_one_product/:id", getOneProduct as RequestHandler)
productRouter.post("/add_product", addProduct as RequestHandler)
productRouter.put("/update_product/:id", updateProduct as RequestHandler)
productRouter.delete("/delete_product/:id", DeleteProduct as RequestHandler)

export default productRouter