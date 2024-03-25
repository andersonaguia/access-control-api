import { Module } from '@nestjs/common';
import { DoorHistoryController } from './controllers/doorHistory.controller';
import { DoorHistoryService } from './services/doorHistory.service';
import { DoorHistoryRepository } from './doorHistory.repository';

@Module({
  imports: [],
  controllers: [DoorHistoryController],
  providers: [DoorHistoryService, DoorHistoryRepository],
  exports: [DoorHistoryService],
})
export class DoorHistoryModule {}
