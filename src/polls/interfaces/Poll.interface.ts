export type Participants = {
  [participantID: string]: string;
};

export type Nomination = {
  userID: string;
  text: string;
};

type NominationID = string;

export type Nominations = {
  [nominationID: NominationID]: Nomination;
};

export type Rankings = {
  [userID: string]: NominationID[];
};

export interface Poll {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  nominations: Nominations;
  rankings: Rankings;
  hasStarted: boolean;
}
