import { Body, Controller, Logger, Post } from '@nestjs/common';

import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';

@Controller('polls')
export class PollsController {
  @Post()
  async create(
    @Body()
    createPollDto: CreatePollDto,
  ) {
    Logger.log('In create');

    return createPollDto;
  }

  @Post('/join')
  async join(
    @Body()
    joinPollDto: JoinPollDto,
  ) {
    Logger.log('in join');

    return joinPollDto;
  }

  @Post('/rejoin')
  async rejoin() {
    Logger.log('in rejoin');
  }
}
