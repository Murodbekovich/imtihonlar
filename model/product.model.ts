import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";

export class Product extends Model {
    product_name!: string;
    product_img!: string;
    product_count!: string;
    price!: number;
    description!: string;
    product_category!: string;
    product_size?: string;
    product_color?: string;
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
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_size: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_color: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: "product",
        timestamps: true,
        sequelize,
    }
)