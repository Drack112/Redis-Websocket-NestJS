import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { createPollID, createuserID } from 'utils/generate-nano-id';
import { Poll } from './interfaces/Poll.interface';
import { PollsRepository } from './polls.repository';
import {
  AddParticipantsFields,
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './types';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly pollsRepository: PollsRepository,
  ) {}

  async createPoll(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createuserID();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });

    const signedString = this.jwtService.sign(
      {
        pollID: createdPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    this.logger.debug(
      `Creating token string for pollID: ${createdPoll.id} and userID: ${userID}`,
    );

    return {
      poll: createdPoll,
      accessToken: signedString,
    };
  }

  async joinPoll(fields: JoinPollFields) {
    const userID = createuserID();

    this.logger.debug(
      `Fetching poll with ID: ${fields.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(fields.pollID);

    this.logger.debug(
      `Creating token string for pollID: ${joinedPoll.id} and userID: ${userID}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: joinedPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    this.logger.debug(
      `Rejoining poll with ID: ${fields.pollID} for user with ID: ${fields.userID} with name: ${fields.name}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(fields);

    return joinedPoll;
  }

  async addParticipant(fields: AddParticipantsFields): Promise<Poll> {
    return this.pollsRepository.addParticipant(fields);
  }

  async removeParticipants(
    pollID: string,
    userID: string,
  ): Promise<Poll | void> {
    const poll = await this.pollsRepository.getPoll(pollID);

    if (!poll.hasStarted) {
      const updatePoll = await this.pollsRepository.removeParticipant(
        pollID,
        userID,
      );

      return updatePoll;
    }
  }
}
