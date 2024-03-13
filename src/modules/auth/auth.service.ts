import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthServices {
  constructor(private authService: AuthRepository) { }

  login(req: LoginDTO) {
    return this.authService.login(req);
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
