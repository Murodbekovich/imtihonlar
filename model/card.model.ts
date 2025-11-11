import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";
import { User } from "./user.model.ts";
import { Product } from "./product.model.ts";

export class Cart extends Model {
    id!: number;
    user_id!: number;
    product_id!: number;
    quantity!: number;
}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},
{
    tableName: "cart",
    timestamps: true,
    sequelize,
})

Cart.belongsTo(User, { foreignKey: "user_id" })
Cart.belongsTo(Product, { foreignKey: "product_id" })
User.hasMany(Cart, { foreignKey: "user_id" })
Product.hasMany(Cart, { foreignKey: "product_id" })