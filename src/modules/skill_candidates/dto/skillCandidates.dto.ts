import { IsNotEmpty } from 'class-validator';

export class SkillCandidatesDTO {
  @IsNotEmpty()
  name: string;
  level_job_id: string;
}
