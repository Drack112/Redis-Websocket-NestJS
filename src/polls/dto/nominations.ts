import { IsString, Length } from 'class-validator';

export class NominationDTO {
  @IsString()
  @Length(1, 100)
  text: string;
}
