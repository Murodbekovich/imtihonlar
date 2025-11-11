import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";

export class Category extends Model {
    id!: number;
    category_name!: string;
    category_description?: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category_description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
{
    tableName: "categories",
    timestamps: true,
    sequelize,
})