import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: String(process.env.DB_PASSWORD as string),
    database: String(process.env.DB_NAME as string),
    username: "postgres",
    logging: false
})

sequelize.authenticate().then(() => console.log("Succesfully connected to DB"))
    .catch((error: any) => console.log(error.message as string))

sequelize.sync({ force: false })

export default sequelize