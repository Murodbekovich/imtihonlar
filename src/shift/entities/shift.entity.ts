import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'shifts', timestamps: true, underscored: true })
export class Shift extends Model<
  InferAttributes<Shift>,
  InferCreationAttributes<Shift>
> {

  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.TIME, allowNull: false })
  startTime: string;

  @Column({ type: DataType.TIME, allowNull: false })
  endTime: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;
}
