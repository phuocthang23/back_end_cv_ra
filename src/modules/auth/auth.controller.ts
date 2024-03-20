import { Controller, Post, Put, Body } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthServices } from './auth.service';
import { LoginDTO, RegisterDTO, ForgotPasswordDTO } from './dto/auth.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthServices) { }

  @Post('/login')
  login(@Body() loginDTOController: LoginDTO): Promise<any> {
    const result = this.authService.login(loginDTOController);
    return result;
  }

  @Post('/register')
  register(@Body() registerDTOController: RegisterDTO): Promise<any> {
    const req = { ...registerDTOController };
    return this.authService.register(req);
  }

  @Put('/forgot-password')
  forgotPassword(@Body() forgotPasswordController: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordController);
  }
}
