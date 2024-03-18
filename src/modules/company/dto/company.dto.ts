import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CompanyDTO {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  facbookLink: string;

  @IsString()
  @IsNotEmpty()
  Linkeidn: string;

  @IsString()
  Github: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  policy: string;
}
