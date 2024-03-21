import { IsNotEmpty, Validate } from 'class-validator';

export class JobDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  expire_at: string;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  companyId: number;
}
