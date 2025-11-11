import { Router } from "express";
import { getAllCategories, getCategory, addCategory, updateCategory, deleteCategory } from "../controller/category.ctr.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const categoryRouter: Router = Router()

categoryRouter.get("/get_all_categories", getAllCategories)
categoryRouter.get("/get_category/:id", getCategory)
categoryRouter.post("/add_category", authMiddleware, addCategory)
categoryRouter.put("/update_category/:id", authMiddleware, updateCategory)
categoryRouter.delete("/delete_category/:id", authMiddleware, deleteCategory)

export default categoryRouter