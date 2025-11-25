import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student } from '../../student/entities/student.entity';

@Table({ tableName: 'admissions', timestamps: true, underscored: true })
export class Admission extends Model<
  InferAttributes<Admission>,
  InferCreationAttributes<Admission>
> {
  declare id: CreationOptional<number>;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentId: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  admittedDate: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  grade: string;

  @BelongsTo(() => Student)
  student: Student;
}
