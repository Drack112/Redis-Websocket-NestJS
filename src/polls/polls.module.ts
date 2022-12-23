import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomRedisModule, jwtModule } from 'src/modules.config';
import { PollsController } from './polls.controller';
import { PollsRepository } from './repository/polls.repository';
import { PollsService } from './polls.service';
import { PollsGateway } from './polls.gateway';

@Module({
  imports: [ConfigModule, CustomRedisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository, PollsGateway],
})
export class PollsModule {}
