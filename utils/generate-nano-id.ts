import { customAlphabet, nanoid } from "nanoid";

export const createPollID = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6,
);

export const createuserID = () => nanoid()
export const createNominationId = () => nanoid(8)
