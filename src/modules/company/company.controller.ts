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
import { CompanyDTO } from './dto/company.dto';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

@Controller(`${process.env.API_KEY}/company`)
export class CompanyController {
  constructor(
    private company: CompanyService,
    private sharedDataService: SharedDataService,
  ) {}

  @UseGuards(CheckAuthenGuard)
  @Post('/')
  createCompany(@Body() body: CompanyDTO) {
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
  // @UseGuards(AuthGuard)
  deteleCompany(@Param('id') id: number) {
    return this.company.deteleCompany(id);
  }

  @Put('/update/:id')
  // @UseGuards(AuthGuard)
  updateUserById(@Param('id') id: number, @Body() body: CompanyDTO) {
    return this.company.updateUserById(id, body);
  }
}
