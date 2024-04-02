import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class RegisterCompanyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  size: number;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class LoginCompanyDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SendMailDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;
}

export class ForgotPasswordDTO {
  @IsNotEmpty()
  card_id: string;

  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDTO {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
