export class CreateScheduleDayDto {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  shiftId?: number;
  room?: string;
}
