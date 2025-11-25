export class CreateAttendanceDto {
  studentId: number;
  date: string;
  status: 'present' | 'absent' | 'late';
}
