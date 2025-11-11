import { Router } from "express";
import { register, login, updatePassword, getProfile, updateProfile } from "../controller/auth.ctr.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { upload } from "../middleware/upload.middleware.ts";

const authRouter: Router = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.put("/update-password", authMiddleware, updatePassword)
authRouter.get("/profile", authMiddleware, getProfile)
authRouter.put("/profile", authMiddleware, upload.single("profile_img"), updateProfile)

export default authRouter