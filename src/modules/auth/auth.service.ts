import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
@Injectable()
export class AuthServices {
  constructor(
    private authService: AuthRepository,
    private readonly generateToken: GenerateToken,
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
}
