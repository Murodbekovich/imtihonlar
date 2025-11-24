import { Router, type RequestHandler } from "express";
import { addStudent, deleteStudent, getAllstudents, getOneStudent, updateStudent } from "../controller/student.ctr.ts";

const studentRouter: Router = Router()

studentRouter.get("/get_all_students", getAllstudents as RequestHandler)
studentRouter.get("/get_one_student/:id", getOneStudent as RequestHandler)
studentRouter.post("/add_student", addStudent as RequestHandler)
studentRouter.put("/update_student/:id", updateStudent as RequestHandler)
studentRouter.delete("/delete_student/:id", deleteStudent as RequestHandler)

export default studentRouter