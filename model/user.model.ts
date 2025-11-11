import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";

export class User extends Model {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    profile_img?: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_img: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: "users",
    timestamps: true,
    sequelize,
})