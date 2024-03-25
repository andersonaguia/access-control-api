import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { DoorsModule } from '../doors/doors.module';

@Module({
  imports: [forwardRef(() => DoorsModule)],
  providers: [EventsGateway],  
  exports: [EventsGateway],
})
export class EventsModule {}
