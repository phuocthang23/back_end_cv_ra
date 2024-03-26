import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ProjectCandidatesDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  started_at: string;

  @IsNotEmpty()
  end_at: string;

  @IsNotEmpty()
  info: string;
}
