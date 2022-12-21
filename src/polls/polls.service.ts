import { Injectable } from '@nestjs/common';
import { createPollID, createuserID } from 'utils/generate-nano-id';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';

@Injectable()
export class PollsService {
  async createPoll(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createuserID();

    return {
      ...fields,
      userID,
      pollID,
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
