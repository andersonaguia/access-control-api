import { Module } from '@nestjs/common';
import { AccessCardsController } from './controllers/accessCards.controller';
import { AccessCardsRepository } from './accessCards.repository';
import { AccessCardsService } from './services/accessCards.service';

@Module({
  imports: [],
  controllers: [AccessCardsController],
  providers: [AccessCardsService, AccessCardsRepository],
  exports: [AccessCardsService],
})
export class AccessCardsModule {}
