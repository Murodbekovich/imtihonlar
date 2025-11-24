import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.ts";

export class Staff extends Model {
    full_name!: string;
    phone_number!: string;
    position!: string;
    parent_name!: string;
    parent_number!: string;
    img_url!: string;
}

Staff.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: "Staff",
        timestamps: true,
        sequelize,
    }
)