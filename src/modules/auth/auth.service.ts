import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from './user/user.repository';
import { LoginDTO, RegisterDTO, SendMailDTO } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { EmailService } from '../../shared/utils/mail.service';
@Injectable()
export class AuthServices {
  constructor(
    private authService: AuthRepository,
    private readonly generateToken: GenerateToken,
    private userService: UserRepository,
    private emailService: EmailService,
  ) { }

  async login(req: LoginDTO) {
    const checkUser = await this.authService.login(req);
    if (checkUser) {
      const isChecked =
        checkUser && bcrypt.compareSync(req.password, checkUser.password);
      const dataGenerateToken = {
        id: checkUser.id,
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role?.role,
      };
      const access_token = isChecked
        ? this.generateToken.signJwt({ dataGenerateToken })
        : null;
      if (access_token !== null) {
        return {
          data: dataGenerateToken,
          access_token,
        };
      } else {
        throw new HttpException('Enter wrong email or password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Enter wrong email or password', HttpStatus.UNAUTHORIZED);
    }
  }


  async register(req: RegisterDTO): Promise<any> {
    const hashPassword = (password: string) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = { ...req, password: hashPassword(req.password) };
    const response = await this.authService.register(user);
    if (response) {
      return {
        success: true,
        message: 'Register successfully',
      };
    }
  }

  async sendMailChangePassword(req: SendMailDTO): Promise<any> {
    const checkUser = await this.userService.checkUser(req);
    if (checkUser === null) {
      throw new HttpException(
        'Email not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const html = `<a href="http://127.0.0.1:3000/reset-password">Click here to confirm your reset password</a>`;
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
      throw new HttpException(
        'not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
