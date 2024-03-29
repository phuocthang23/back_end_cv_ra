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
import { SkillServices } from './skill.service';
import { SkillDTO } from './dto/skill.dto';
dotenv.config();
@Controller(`${process.env.API_KEY}/skill`)
export class SkillController {
  constructor(private readonly skillServices: SkillServices) {}
  @Post('/')
  async createSkill(@Body() skillController: SkillDTO): Promise<any> {
    return this.skillServices.createSkill(skillController);
  }

  @Get('/')
  async getAllSkill() {
    return this.skillServices.getAllSkill();
  }

  @Get('/:id')
  async getOneSkill(@Param('id') id: number): Promise<any> {
    return this.skillServices.getOneSkill(id);
  }

  @Put('/:id')
  updateSkill(
    @Body() projectCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.skillServices.updateSkill(projectCandidatesController, id);
  }

  @Delete('/:id')
  deleteSkill(@Param('id') id: number) {
    return this.skillServices.deleteSkill(id);
  }
}
