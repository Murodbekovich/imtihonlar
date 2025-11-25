import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize';

import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Shift } from '../../shift/entities/shift.entity';

@Table({ tableName: 'schedule_days', timestamps: true, underscored: true })
export class ScheduleDay extends Model<
  InferAttributes<ScheduleDay>,
  InferCreationAttributes<ScheduleDay>
> {
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'),
    allowNull: false
  })
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

  @ForeignKey(() => Shift)
  @Column({ type: DataType.INTEGER, allowNull: true })
  shiftId?: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  room?: string;

  @BelongsTo(() => Shift)
  shift: Shift;
}
