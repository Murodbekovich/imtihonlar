import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";
import { Order } from "./order.model.ts";
import { Product } from "./product.model.ts";

export class OrderItem extends Model {
    id!: number;
    order_id!: number;
    product_id!: number;
    quantity!: number;
    price!: number;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
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
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: "order_items",
    timestamps: true,
    sequelize,
})

OrderItem.belongsTo(Order, { foreignKey: "order_id" })
OrderItem.belongsTo(Product, { foreignKey: "product_id" })
Order.hasMany(OrderItem, { foreignKey: "order_id" })