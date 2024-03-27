import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from './user/user.repository';
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  SendMailDTO,
} from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { EmailService } from '../../shared/utils/mail.service';
import * as makeToken from 'uniqid';
@Injectable()
export class AuthServices {
  constructor(
    private authService: AuthRepository,
    private readonly generateToken: GenerateToken,
    private userService: UserRepository,
    private emailService: EmailService,
  ) {}

  async login(req: LoginDTO) {
    const checkUser = await this.authService.login(req);
    if (checkUser) {
      const isChecked =
        checkUser && bcrypt.compareSync(req.password, checkUser.password);
      const data = {
        id: checkUser.id,
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role?.role,
      };
      const access_token = isChecked
        ? this.generateToken.signJwt({ data })
        : null;
      if (access_token !== null) {
        return {
          data: data,
          access_token,
        };
      } else {
        throw new HttpException(
          'Enter wrong email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Enter wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(req: RegisterDTO): Promise<any> {
    const checkUser = await this.userService.checkUser(req);
    if (checkUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    try {
      const cardEncryption = makeToken();
      const card_id: string = cardEncryption;
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const user = { ...req, password: hashPassword(req.password), card_id };
      const response = await this.authService.register(user);
      if (response) {
        return {
          success: true,
          message: 'Register successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  async forgotPassword(req: ForgotPasswordDTO): Promise<any> {
    const checkUser = await this.userService.checkCardId(req);
    if (checkUser === null) {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const data = {
        email: checkUser.email,
        password: hashPassword(req.password),
      };
      await this.authService.forgotPassword(data);
      return { message: 'Forgot password successfully' };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async sendMailChangePassword(req: SendMailDTO): Promise<any> {
    const checkUser = await this.userService.checkUser(req);
    if (checkUser === null) {
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const html = `<a href="http://localhost:5173/auth/reset-password/${checkUser.card_id}">Click here to confirm your reset password</a>`;
      const data = {
        email: checkUser.email,
        html,
        subject: 'Reset password',
      };

      await this.emailService.sendEmail(data.email, data.subject, data.html);
      return {
        message: 'Please check mail',
      };
    } catch (error) {
      throw new HttpException('not found', HttpStatus.BAD_REQUEST);
    }
  }
}
