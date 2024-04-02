import { Controller, Post, Put, Body } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthCompanyServices } from './auth.service';

import {
  RegisterCompanyDTO,
  LoginCompanyDTO,
  SendMailDTO,
  ForgotPasswordDTO,
} from '../dto/company.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/auth`)
export class AuthCompanyController {
  constructor(private readonly authCompanyService: AuthCompanyServices) {}

  @Post('/login')
  login(@Body() loginCompanyController: LoginCompanyDTO): Promise<any> {
    const result = this.authCompanyService.login(loginCompanyController);
    return result;
  }

  @Post('/register')
  register(@Body() registerCompanyController: RegisterCompanyDTO) {
    return this.authCompanyService.register(registerCompanyController);
  }

  @Put('/send-mail-reset-password')
  sendMailResetPassword(@Body() sendMailController: SendMailDTO) {
    return this.authCompanyService.sendMailChangePassword(sendMailController);
  }

  @Put('/forgot-password')
  forgotPassword(@Body() forgotPasswordController: ForgotPasswordDTO) {
    return this.authCompanyService.forgotPassword(forgotPasswordController);
  }
}
