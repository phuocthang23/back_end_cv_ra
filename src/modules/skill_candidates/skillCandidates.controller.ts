import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SkillCandidatesServices } from './skillCandidates.service';
import { SkillCandidatesDTO } from './dto/skillCandidates.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/skill_candidates`)
export class SkillCandidatesController {
  constructor(
    private readonly skillCandidatesServices: SkillCandidatesServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createProjectCandidates(
    @Body() skillCandidatesController: any,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.skillCandidatesServices.createSkillCandidatesServices(
      skillCandidatesController,
      currentToken.data.id,
    );
  }

  @Get('/')
  async getProjectCandidates(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.skillCandidatesServices.getAllSkillCandidatesServices(
      name,
      page,
      limit,
    );
  }

  @Get('/:id')
  async getOneProjectCandidates(@Param('id') id: number): Promise<any> {
    return this.skillCandidatesServices.getOneSkillCandidatesServices(id);
  }

  @Put('/:id')
  updateProjectCandidates(
    @Body() skillCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.skillCandidatesServices.updateSkillCandidatesServices(
      skillCandidatesController,
      id,
    );
  }

  @Delete('/:id')
  deleteProjectCandidates(@Param('id') id: number) {
    return this.skillCandidatesServices.deleteSkillCandidatesServices(id);
  }
}
