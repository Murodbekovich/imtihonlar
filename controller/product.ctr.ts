import type { Response, Request } from "express"
import type { AddProductDto, UpdateProductDto } from "../dto/product.dto.ts"
import { Product } from "../model/product.model.ts"
import { Category } from "../model/category.model.ts"

Product.sync({force:false})

export const getAllProducts = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { category, search, sortBy } = req.query
        
        const whereClause: any = {}
        const order: any = []

        if (category) {
            whereClause.product_category = category
        }

        if (search) {
            whereClause.product_name = { [Symbol.for("iLike")]: `%${search}%` }
        }

        if (sortBy === "price_asc") {
            order.push(["price", "ASC"])
        } else if (sortBy === "price_desc") {
            order.push(["price", "DESC"])
        } else if (sortBy === "likes") {
            order.push(["likes_count", "DESC"])
        } else {
            order.push(["createdAt", "DESC"])
        }

        const products = await Product.findAll({ 
            where: whereClause,
            order,
            include: [{ model: Category, as: "category" }]
        })

        res.status(200).json(products)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getOneProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Product.findByPk(id, { include: [{ model: Category, as: "category" }] })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(product)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const addProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { product_name, product_count, price, description, product_category, product_size, product_color } = req.body as AddProductDto
        const product_img = req.file ? req.file.filename : ""

        await Product.create({ product_name, product_img, product_count, price, description, product_category, product_size, product_color })

        res.status(201).json({ message: "Added new product" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params
        const { product_name, product_count, price, description, product_category, product_size, product_color } = req.body as UpdateProductDto
        const product_img = req.file ? req.file.filename : undefined

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const updateData: any = {}
        if (product_name) updateData.product_name = product_name
        if (product_img) updateData.product_img = product_img
        if (product_count !== undefined) updateData.product_count = product_count
        if (price) updateData.price = price
        if (description) updateData.description = description
        if (product_category) updateData.product_category = product_category
        if (product_size) updateData.product_size = product_size
        if (product_color) updateData.product_color = product_color

        await product.update(updateData)

        res.status(200).json({ message: "Product updated" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.destroy()

        res.status(200).json({ message: "Product deleted" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const likeProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.update({ isLikes: true })

        res.status(200).json({ message: "Product liked", isLikes: product.isLikes})
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const unlikeProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.update({ isLikes:false })

        res.status(200).json({ message: "Product unliked" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}