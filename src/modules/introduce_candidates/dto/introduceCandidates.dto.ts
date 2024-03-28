import { IsNotEmpty } from 'class-validator';

export class IntroduceCandidatesDTO {
  @IsNotEmpty()
  description: string;
}
