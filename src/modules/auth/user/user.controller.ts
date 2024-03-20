import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserServices } from './user.service';
import { ChangePasswordDTO } from '../dto/auth.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/user`)
export class UserController {
    constructor(
        private readonly authService: UserServices,
        private sharedDataService: SharedDataService,
    ) { }

    @Put('/change-password')
    @UseGuards(CheckAuthenGuard)
    changePassword(@Body() changePasswordController: ChangePasswordDTO): Promise<any> {
        const currentToken = this.sharedDataService.getCurrentToken();
        const data = { ...changePasswordController, email: currentToken.dataGenerateToken.email }
        const result = this.authService.changePassword(data);
        return result;
    }
}
