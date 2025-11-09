import type { NextFunction, Request, Response } from "express"
import type { AddProductDto } from "../dto/product.dto.ts"
import { Product } from "../model/product.model.ts"

export const getAllproducts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const product = await Product.findAll()

        res.status(200).json((product))
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json(product)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { product_name, product_img, product_count, price, description, product_category, product_size, product_color } = req.body as AddProductDto


        await Product.create({ product_name, product_img, product_count, price, description, product_category, product_size, product_color })

        res.status(202).json({
            message: "Added new product"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const DeleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}