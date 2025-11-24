import type { NextFunction, Request, Response } from "express"
import { Student } from "../model/student.model.ts"
import type { AddStudentDto, UpdateStudentDto } from "../dto/student.dto.ts"
import { Op } from "sequelize"

export const getAllstudents = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const offset = (page - 1) * limit
        
        const search = (req.query.search as string)?.trim() || ""
        let whereClause = {}

        if (search) {
            whereClause = {
                [Op.or]: [
                    { full_name: { [Op.iLike]: `%${search}%` } },
                    { phone_number: { [Op.iLike]: `%${search}%` } },
                    { profession: { [Op.iLike]: `%${search}%` } },
                    { parent_name: { [Op.iLike]: `%${search}%` } }
                ]
            }
        }

        const {count, rows: students} = await Student.findAndCountAll(
            {
                where: whereClause,
                limit,
                offset,
                order: [["id", "ASC"]]
            }
        )

        const totalPage = (count / limit)

        const student = await Student.findAll()

        res.status(200).json((student))
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getOneStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params

        const student = await Student.findByPk(id)

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        res.status(200).json(student)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { full_name, phone_number, profession, parent_name, parent_number, img_url } = req.body as AddStudentDto


        await Student.create({ full_name, phone_number, profession, parent_name, parent_number, img_url })

        res.status(202).json({
            message: "Added new student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params

        const { full_name, phone_number, profession, parent_name, parent_number, img_url } = req.body as UpdateStudentDto

        const student = await Student.findByPk(id)

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        await Student.update(
            { full_name, phone_number, profession, parent_name, parent_number, img_url },
            { where: { id } }
        )

        res.status(202).json({
            message: "Update student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params

        const product = await Student.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        await Student.destroy({ where: { id } })

        res.status(202).json({
            message: "Deleted student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}