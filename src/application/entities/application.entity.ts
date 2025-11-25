import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student } from '../../student/entities/student.entity';

@Table({ tableName: 'applications', timestamps: true, underscored: true })
export class Application extends Model {
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentId: number;

  @Column({ type: DataType.ENUM('pending', 'approved', 'rejected'), allowNull: false, defaultValue: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ type: DataType.DATEONLY, allowNull: false })
  appliedDate: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @BelongsTo(() => Student)
  student: Student;
}
