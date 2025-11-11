import type { Response, Request } from "express"
import type { CreateOrderDto } from "../dto/order.dto.ts"
import { Order } from "../model/order.model.ts"
import { OrderItem } from "../model/orderItem.model.ts"
import { Product } from "../model/product.model.ts"
import { Cart } from "../model/card.model.ts"

export const createOrder = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id
        const { items } = req.body as CreateOrderDto

        let totalAmount = 0
        const orderItems = []

        for (const item of items) {
            const product = await Product.findByPk(item.product_id)
            if (!product) {
                return res.status(404).json({ message: `Product with id ${item.product_id} not found` })
            }

            if (product.product_count < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product ${product.product_name}` })
            }

            totalAmount += product.price * item.quantity
            orderItems.push({ product, quantity: item.quantity, price: product.price })
        }

        const order = await Order.create({ user_id: userId, total_amount: totalAmount })

        for (const item of orderItems) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.price
            })

            await item.product.update({ product_count: item.product.product_count - item.quantity })
        }

        await Cart.destroy({ where: { user_id: userId } })

        res.status(201).json({ message: "Order created successfully", order })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserOrders = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).user.id

        const orders = await Order.findAll({ 
            where: { user_id: userId },
            include: [{ model: OrderItem, include: [Product] }],
            order: [["createdAt", "DESC"]]
        })

        res.status(200).json(orders)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getOrder = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params
        const userId = (req as any).user.id

        const order = await Order.findOne({ 
            where: { id, user_id: userId },
            include: [{ model: OrderItem, include: [Product] }]
        })

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        res.status(200).json(order)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const processPayment = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { orderId } = req.body

        const order = await Order.findOne({ where: { id: orderId, user_id: (req as any).user.id } })

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        await order.update({ payment_status: "paid", status: "processing" })

        res.status(200).json({ message: "Payment processed successfully", order })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}