import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies?.AccessToken
        
        if (!token) {
            res.status(401).json({ message: "No token provided" })
            return
        }

        const decoded:string = jwt.verify(token, process.env.JWT_SECRET as string) as string
        (req as any).user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}