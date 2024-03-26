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
import { EducationCandidatesServices } from './educationCandidates.service';
import { EducationCandidatesDTO } from './dto/educationCandidates.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/education_candidates`)
export class EducationCandidatesController {
  constructor(
    private readonly educationCandidatesServices: EducationCandidatesServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createProjectCandidates(
    @Body() skillCandidatesController: EducationCandidatesDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...skillCandidatesController,
      candidatesId: currentToken.data.id,
    };
    return this.educationCandidatesServices.createEducationCandidatesServices(
      data,
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
    return this.educationCandidatesServices.getAllEducationCandidatesServices(
      name,
      page,
      limit,
    );
  }

  @Get('/:id')
  async getOneProjectCandidates(@Param('id') id: number): Promise<any> {
    return this.educationCandidatesServices.getOneEducationCandidatesServices(
      id,
    );
  }

  @Put('/:id')
  updateProjectCandidates(
    @Body() skillCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.educationCandidatesServices.updateEducationCandidatesServices(
      skillCandidatesController,
      id,
    );
  }

  @Delete('/:id')
  deleteProjectCandidates(@Param('id') id: number) {
    return this.educationCandidatesServices.deleteEducationCandidatesServices(
      id,
    );
  }
}
