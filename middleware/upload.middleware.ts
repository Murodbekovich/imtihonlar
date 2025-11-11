import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "uploads/"
        if (file.fieldname === "product_img") {
            uploadPath += "products/"
        } else if (file.fieldname === "profile_img") {
            uploadPath += "profiles/"
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})