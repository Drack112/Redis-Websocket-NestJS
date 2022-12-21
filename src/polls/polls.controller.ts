import { Body, Controller, Logger, Post } from '@nestjs/common';

import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Post()
  async create(
    @Body()
    createPollDto: CreatePollDto,
  ) {
    Logger.log('In create');

    const result = await this.pollsService.createPoll(createPollDto);

    return result;
  }

  @Post('/join')
  async join(
    @Body()
    joinPollDto: JoinPollDto,
  ) {
    Logger.log('in join');

    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  @Post('/rejoin')
  async rejoin() {
    Logger.log('in rejoin');

    const result = await this.pollsService.rejoinPoll({
      name: 'From token',
      pollID: 'Also from token',
      userID: 'Guess where this comes from?',
    });

    return result;
  }
}
