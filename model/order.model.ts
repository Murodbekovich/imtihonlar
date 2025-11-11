import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";
import { User } from "./user.model.ts";

export class Order extends Model {
    id!: number;
    user_id!: number;
    total_amount!: number;
    status!: string;
    payment_status!: string;
}

Order.init({
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
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled"),
        defaultValue: "pending"
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending"
    }
},
{
    tableName: "orders",
    timestamps: true,
    sequelize,
})

Order.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(Order, { foreignKey: "user_id" })