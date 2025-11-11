import type { Response, Request } from "express"
import type { AddToCartDto, UpdateCartDto } from "../dto/card.dto.ts"
import { Cart } from "../model/card.model.ts"
import { Product } from "../model/product.model.ts"

export const getCart = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id

        const cartItems = await Cart.findAll({ 
            where: { user_id: userId },
            include: [Product]
        })

        res.status(200).json(cartItems)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const { product_id, quantity } = req.body as AddToCartDto

        const product = await Product.findByPk(product_id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (product.product_count < quantity) {
            return res.status(400).json({ message: "Not enough products in stock" })
        }

        const existingCartItem = await Cart.findOne({ where: { user_id: userId, product_id } })

        if (existingCartItem) {
            await existingCartItem.update({ quantity: existingCartItem.quantity + quantity })
        } else {
            await Cart.create({ user_id: userId, product_id, quantity })
        }

        res.status(200).json({ message: "Product added to cart" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCartItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const { id } = req.params
        const { quantity } = req.body as UpdateCartDto

        const cartItem = await Cart.findOne({ where: { id, user_id: userId } })

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" })
        }

        const product = await Product.findByPk(cartItem.product_id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (product.product_count < quantity) {
            return res.status(400).json({ message: "Not enough products in stock" })
        }

        await cartItem.update({ quantity })

        res.status(200).json({ message: "Cart item updated" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const removeFromCart = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const { id } = req.params

        const cartItem = await Cart.findOne({ where: { id, user_id: userId } })

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" })
        }

        await cartItem.destroy()

        res.status(200).json({ message: "Product removed from cart" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const clearCart = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id

        await Cart.destroy({ where: { user_id: userId } })

        res.status(200).json({ message: "Cart cleared" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}