import type { Response ,Request} from "express"
import type { RegisterDto, LoginDto, UpdatePasswordDto } from "../dto/auth.dto.ts"
import { User } from "../model/user.model.ts"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { access } from "fs"

export const register = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { username, email, password } = req.body as RegisterDto

        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user.id, username: user.username, email: user.email }
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log(error);
    }
}

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body as LoginDto

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password,user.dataValues.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        res.cookie("AccessToken", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, username: user.username, email: user.email, profile_img: user.profile_img }
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        console.log(error);
        
    }
}

export const updatePassword = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { oldPassword, newPassword } = req.body as UpdatePasswordDto
        const userId = (req as any).user.id

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
        if (!isOldPasswordValid) {
            return res.status(400).json({ message: "Old password is incorrect" })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        await user.update({ password: hashedNewPassword })

        res.status(200).json({ message: "Password updated successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getProfile = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const { username } = req.body
        const profile_img = req.file ? req.file.path : undefined

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const updateData: any = {}
        if (username) updateData.username = username
        if (profile_img) updateData.profile_img = profile_img

        await user.update(updateData)

        res.status(200).json({ message: "Profile updated successfully", user: { id: user.id, username: user.username, email: user.email, profile_img: user.profile_img } })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}