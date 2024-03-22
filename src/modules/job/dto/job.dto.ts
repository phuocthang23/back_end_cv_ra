import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

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

export class BlockJobDTO {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === '1') return true;
    if (value === '0') return false;
    return value;
  })
  isSeen: boolean;
}