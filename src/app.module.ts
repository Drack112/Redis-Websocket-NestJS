import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomRedisModule } from './modules.config';

import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      encoding: 'UTF-8',
      isGlobal: true,
    }),
    PollsModule,
    CustomRedisModule,
  ],
  controllers: [],
})
export class AppModule {}
