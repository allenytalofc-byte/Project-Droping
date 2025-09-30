import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseService } from '../../database/database.service';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [DevicesModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, DatabaseService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
