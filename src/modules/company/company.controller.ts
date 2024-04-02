import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { ChangePasswordDTO } from './dto/company.dto';

@Controller(`${process.env.API_KEY}/company`)
export class CompanyController {
  constructor(
    private company: CompanyService,
    private sharedDataService: SharedDataService,
  ) {}

  @UseGuards(CheckAuthenGuard)
  @Post('/')
  createCompany(@Body() body: any) {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...body,
      userId: currentToken.data.id,
    };
    return this.company.createCompany(data);
  }

  @Get('/')
  getAllCompany(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.company.getAllCompany(name, limit, page);
  }

  @Get('/:id')
  getOneCompany(@Param('id') id: number) {
    return this.company.getOneCompany(id);
  }

  @Delete('/:id')
  deleteCompany(@Param('id') id: number) {
    return this.company.deleteCompany(id);
  }

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  updateUserById(@Param('id') id: number, @Body() body: any) {
    return this.company.updateCompanyById(id, body);
  }

  @Put('/change-password')
  @UseGuards(CheckAuthenGuard)
  changePassword(
    @Body() changePasswordController: ChangePasswordDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...changePasswordController,
      email: currentToken.data.email,
    };
    const result = this.company.changePassword(data);
    return result;
  }
}
