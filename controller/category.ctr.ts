import type { Response, Request } from "express"
import type { AddCategoryDto, UpdateCategoryDto } from "../dto/category.dto.ts"
import { Category } from "../model/category.model.ts"

export const getAllCategories = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const categories = await Category.findAll()

        res.status(200).json(categories)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getCategory = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const category = await Category.findByPk(id, { include: ["products"] })

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const addCategory = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { category_name, category_description } = req.body as AddCategoryDto

        await Category.create({ category_name, category_description })

        res.status(201).json({ message: "Category added successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params
        const { category_name, category_description } = req.body as UpdateCategoryDto

        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        await category.update({ category_name, category_description })

        res.status(200).json({ message: "Category updated successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params

        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        await category.destroy()

        res.status(200).json({ message: "Category deleted successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}