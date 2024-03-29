import { IsNotEmpty } from 'class-validator';

export class SkillDTO {
  @IsNotEmpty()
  name: string;
}
