import { IsNotEmpty } from 'class-validator';

export class EducationCandidatesDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  major: string;

  @IsNotEmpty()
  started_at: string;

  @IsNotEmpty()
  end_at: string;

  @IsNotEmpty()
  info: string;
}
