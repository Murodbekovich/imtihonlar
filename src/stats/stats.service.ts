import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '../student/entities/student.entity';
import { Application } from '../application/entities/application.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Admission } from '../admission/entities/admission.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(Application) private applicationModel: typeof Application,
    @InjectModel(Admission) private admissionModel: typeof Admission,
    @InjectModel(Attendance) private attendanceModel: typeof Attendance
  ) {}

  async overview() {
    const totalStudents = await this.studentModel.count();
    const totalApplications = await this.applicationModel.count();
    const approvedApplications = await this.applicationModel.count({ where: { status: 'approved' } });
    const admissionsThisMonth = await this.admissionModel.count({
      where: {},
    });

    const monthlyApps = await this.applicationModel.sequelize?.query(
      `
      SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*)::int AS count
      FROM applications
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at);
      `,
      { type: (this.applicationModel.sequelize as any).QueryTypes.SELECT }
    );

    return {
      totalStudents,
      totalApplications,
      approvedApplications,
      admissionsThisMonth,
      monthlyApps
    };
  }

  async attendanceSummary() {
    const present = await this.attendanceModel.count({ where: { status: 'present' } });
    const absent = await this.attendanceModel.count({ where: { status: 'absent' } });
    const late = await this.attendanceModel.count({ where: { status: 'late' } });
    return { present, absent, late };
  }
}
