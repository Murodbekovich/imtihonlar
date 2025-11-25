import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Application } from './entities/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
  imports: [SequelizeModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
