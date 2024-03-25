import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/common/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { dataSourceOptions } from 'src/core/database/data-source';
import { AuthModule } from 'src/core/auth/auth.module';
import { DoorsModule } from '../doors/doors.module';
import { SourcesModule } from '../sources/sources.module';
import { PeoplesModule } from '../peoples/peoples.module';
import { AccessCardsModule } from '../access_cards/accessCards.module';
import { DoorHistoryModule } from '../door_history/doorHistory.module';
import { EventsModule } from '../events/events.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
    }),
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    AuthModule,
    EventsModule,
    DoorsModule,
    SourcesModule,
    PeoplesModule,
    AccessCardsModule,
    DoorHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
