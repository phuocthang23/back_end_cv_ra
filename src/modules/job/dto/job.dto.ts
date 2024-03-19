import { IsNotEmpty, Validate } from 'class-validator';

export class JobDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  working_time: string;

  @IsNotEmpty()
  wage: number;

  @IsNotEmpty()
  application_deadline: string;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  companyId: number;
}
