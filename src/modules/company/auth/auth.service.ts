import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthCompanyRepository } from './auth.repository';
import {
  ForgotPasswordDTO,
  RegisterCompanyDTO,
  SendMailDTO,
} from '../dto/company.dto';
import * as bcrypt from 'bcryptjs';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { EmailService } from '../../../shared/utils/mail.service';
import * as makeToken from 'uniqid';
@Injectable()
export class AuthCompanyServices {
  constructor(
    private authCompanyService: AuthCompanyRepository,
    private readonly generateToken: GenerateToken,
    private emailService: EmailService,
  ) {}

  async login(req: any) {
    const checkUserCompany = await this.authCompanyService.login(req);
    if (checkUserCompany) {
      const isChecked =
        checkUserCompany &&
        bcrypt.compareSync(req.password, checkUserCompany.password);
      const data = {
        id: checkUserCompany.id,
        email: checkUserCompany.email,
        name: checkUserCompany.name,
        role: checkUserCompany.role?.role,
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

  async register(req: RegisterCompanyDTO): Promise<any> {
    const checkCompany = await this.authCompanyService.checkAuthCompany(req);
    if (checkCompany) {
      throw new HttpException('Account already exists ', HttpStatus.CONFLICT);
    }
    try {
      const cardEncryption = makeToken();
      const card_id: string = cardEncryption;
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const company = { ...req, password: hashPassword(req.password), card_id };
      await this.authCompanyService.register(company);
      return {
        success: true,
        message: 'Register successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  async sendMailChangePassword(req: SendMailDTO): Promise<any> {
    const checkCompany = await this.authCompanyService.checkAuthCompany(req);
    if (checkCompany === null) {
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const html = `<a href="http://localhost:5173/auth/reset-password/${checkCompany.card_id}">Click here to confirm your reset password</a>`;
      const data = {
        email: checkCompany.email,
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

  async forgotPassword(req: ForgotPasswordDTO): Promise<any> {
    const checkCompany = await this.authCompanyService.checkCardId(req);
    if (checkCompany === null) {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const data = {
        email: checkCompany.email,
        password: hashPassword(req.password),
      };
      await this.authCompanyService.forgotPassword(data);
      return { message: 'Forgot password successfully' };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
