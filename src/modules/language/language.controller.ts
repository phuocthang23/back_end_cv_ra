import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LanguageServices } from './language.service';
import { LanguageDTO } from './dto/language.dto';
dotenv.config();
@Controller(`${process.env.API_KEY}/language`)
export class LanguageController {
  constructor(private readonly languageServices: LanguageServices) {}
  @Post('/')
  async createLanguage(@Body() languageController: LanguageDTO): Promise<any> {
    return this.languageServices.createLanguage(languageController);
  }

  @Get('/')
  async getAllLanguage() {
    return this.languageServices.getAllLanguage();
  }

  @Get('/:id')
  async getOneLanguage(@Param('id') id: number): Promise<any> {
    return this.languageServices.getOneLanguage(id);
  }

  @Put('/:id')
  updateLanguage(@Body() languageController: any, @Param('id') id: number) {
    return this.languageServices.updateLanguage(languageController, id);
  }

  @Delete('/:id')
  deleteSkill(@Param('id') id: number) {
    return this.languageServices.deleteLanguage(id);
  }
}
