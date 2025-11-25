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
import { Student } from '../../student/entities/student.entity';

@Table({ tableName: 'attendance', timestamps: true, underscored: true })
export class Attendance extends Model<
  InferAttributes<Attendance>,
  InferCreationAttributes<Attendance>
> {
  declare id: CreationOptional<number>;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentId: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @Column({
    type: DataType.ENUM('present', 'absent', 'late'),
    allowNull: false,
    defaultValue: 'present'
  })
  status: 'present' | 'absent' | 'late';

  @BelongsTo(() => Student)
  student: Student;
}
