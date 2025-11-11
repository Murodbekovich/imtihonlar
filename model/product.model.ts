import { BOOLEAN, DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";
import { Category } from "./category.model.ts";

export class Product extends Model {
    id!: number;
    product_name!: string;
    product_img!: string;
    product_count!: number;
    price!: number;
    description!: string;
    product_category!: number;
    product_size?: string;
    product_color?: string;
    isLikes?: boolean;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    product_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },
    product_size: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isLikes: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    product_color: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: "products",
        timestamps: true,
        sequelize,
    })

Product.belongsTo(Category, { foreignKey: "product_category", as: "category" })
Category.hasMany(Product, { foreignKey: "product_category", as: "products" })