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
import { ProjectCandidatesServices } from './projectCandidates.service';
import { ProjectCandidatesDTO } from './dto/projectCandidates.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/project_candidates`)
export class ProjectCandidatesController {
  constructor(
    private readonly projectCandidatesServices: ProjectCandidatesServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createProjectCandidates(
    @Body() projectCandidatesController: ProjectCandidatesDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...projectCandidatesController,
      candidatesId: currentToken.data.id,
    };
    return this.projectCandidatesServices.createProjectCandidates(data);
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
    return this.projectCandidatesServices.getAllProjectCandidates(
      name,
      page,
      limit,
    );
  }

  @Get('/:id')
  async getOneProjectCandidates(@Param('id') id: number): Promise<any> {
    return this.projectCandidatesServices.getOneProjectCandidates(id);
  }

  @Put('/:id')
  updateProjectCandidates(
    @Body() projectCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.projectCandidatesServices.updateProjectCandidates(
      projectCandidatesController,
      id,
    );
  }

  @Delete('/:id')
  deleteProjectCandidates(@Param('id') id: number) {
    return this.projectCandidatesServices.deleteProjectCandidates(id);
  }
}
