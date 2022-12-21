import { Injectable, Logger } from '@nestjs/common';
import { createPollID, createuserID } from 'utils/generate-nano-id';
import { PollsRepository } from './polls.repository';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createuserID();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userID,
      pollID,
    });

    return {
      poll: createdPoll,
    };
  }

  async joinPoll(fields: JoinPollFields) {
    const userID = createuserID();

    return {
      ...fields,
      userID,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    return fields;
  }
}
