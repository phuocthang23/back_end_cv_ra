import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @MaxLength(50, {
    message: 'User is too long',
  })
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  roleId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDTO {
  @MaxLength(50, {
    message: 'User is too long',
  })

  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}

export class ForgotPasswordDTO {
  @IsNotEmpty()
  card_id: string;

  @IsNotEmpty()
  password: string;
}
