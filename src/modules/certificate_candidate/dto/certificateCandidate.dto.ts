import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CertificateCandidateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  organization: string;

  @IsNotEmpty()
  started_at: string;

  @IsNotEmpty()
  end_at: string;

  @IsNotEmpty()
  info: string;
}
