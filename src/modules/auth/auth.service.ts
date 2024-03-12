import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDTO } from './dto/auth.dto';
@Injectable()
export class AuthServices {
  constructor(private authService: AuthRepository) {}

  login(req: LoginDTO) {
    return this.authService.login(req);
  }
}
