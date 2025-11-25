import { Controller, Get } from '@nestjs/common'
import { StatsService } from './stats.service'

@Controller('stats')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  @Get('overview')
  overview() {
    return this.service.overview()
  }

  @Get('attendance')
  attendance() {
    return this.service.attendanceSummary()
  }
}
