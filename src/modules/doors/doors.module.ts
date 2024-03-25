import { Module, forwardRef } from '@nestjs/common';
import { DoorsService } from './services/doors.service';
import { DoorsRepository } from './doors.respository';
import { DoorsController } from './controllers/doors.controllers';
import { DoorHistoryModule } from '../door_history/doorHistory.module';
import { AccessCardsModule } from '../access_cards/accessCards.module';
import { EventsModule } from '../events/events.module';
@Module({
  imports: [
    forwardRef(() => EventsModule),
    DoorHistoryModule,
    AccessCardsModule,
  ],
  controllers: [DoorsController],
  providers: [DoorsService, DoorsRepository],
  exports: [DoorsService],
})
export class DoorsModule {}
