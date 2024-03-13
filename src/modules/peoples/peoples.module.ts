import { Module } from '@nestjs/common';
import { PeoplesController } from './controllers/peoples.controller';
import { PeoplesService } from './services/peoples.service';
import { PeoplesRepository } from './peoples.repository';

@Module({
  imports: [],
  controllers: [PeoplesController],
  providers: [PeoplesService, PeoplesRepository],
  exports: [],
})
export class PeoplesModule {}
