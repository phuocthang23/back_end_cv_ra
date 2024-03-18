import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';

@Controller(`${process.env.API_KEY}/company`)
export class CompanyController {
  constructor(private company: CompanyService) {}

  @Post('/create')
  createCompany(@Body() body: CompanyDTO): Promise<any> {
    return this.company.createCompany(body);
  }

  @Get('/')
  getAllCompany() {
    return this.company.getAllCompany();
  }

  @Get('/:id')
  getOneCompany(@Param('id') id: number) {
    return this.company.getOneCompany(id);
  }

  @Delete('/delete/:id')
  deteleCompany(@Param('id') id: number) {
    return this.company.deteleCompany(id);
  }

  @Put('/update/:id')
  // @UseGuards(AuthGuard)
  updateUserById(@Param('id') id: number, @Body() body: CompanyDTO) {
    return this.company.updateUserById(id, body);
  }
}
