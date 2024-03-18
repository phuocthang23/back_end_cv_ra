import { IsNotEmpty, Validate } from 'class-validator';
import { isValid, parseISO } from 'date-fns';

function isValidDateFormat(dateString: string): boolean {
  return isValid(parseISO(dateString));
}

export class JobDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Validate(isValidDateFormat, {
    message: 'Working time must be in DD/MM/YYYY format',
  })
  working_time: string;

  @IsNotEmpty()
  wage: number;

  @IsNotEmpty()
  @Validate(isValidDateFormat, {
    message: 'Application deadline must be in DD/MM/YYYY format',
  })
  application_deadline: string;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  companyId: number;
}
