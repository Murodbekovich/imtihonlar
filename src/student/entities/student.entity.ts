import { Column, Model, Table, DataType, Index, Default } from 'sequelize-typescript';

@Table({ tableName: 'students', timestamps: true, underscored: true })
export class Student extends Model {
  @Column({ type: DataType.STRING(100), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName: string;

  @Index({ name: 'students_email_unique', unique: true })
  @Column({ type: DataType.STRING(150), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(200), allowNull: false })
  password: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  birthDate: string;
}