import { IsNotEmpty } from 'class-validator';

export class ExperienceCandidateDTO {
  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  started_at: string;

  @IsNotEmpty()
  end_at: string;

  @IsNotEmpty()
  info: string;
}
