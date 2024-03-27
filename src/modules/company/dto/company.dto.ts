import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CompanyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  size: number;
}
