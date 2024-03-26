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
import { ExperienceCandidateServices } from './experienceCandidates.service';
import { ExperienceCandidateDTO } from './dto/experienceCandidates.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/experience_candidates`)
export class ExperienceCandidateController {
  constructor(
    private readonly experienceCandidateServices: ExperienceCandidateServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createExperienceCandidateServices(
    @Body() experienceCandidateController: ExperienceCandidateDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...experienceCandidateController,
      candidatesId: currentToken.data.id,
    };
    return this.experienceCandidateServices.createExperienceCandidateServices(
      data,
    );
  }

  @Get('/')
  async getExperienceCandidateServices(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.experienceCandidateServices.getAllExperienceCandidateServices(
      name,
      page,
      limit,
    );
  }

  @Get('/:id')
  async getOneExperienceCandidateServices(
    @Param('id') id: number,
  ): Promise<any> {
    return this.experienceCandidateServices.getOneExperienceCandidateServices(
      id,
    );
  }

  @Put('/:id')
  updateExperienceCandidateServices(
    @Body() experienceCandidateController: any,
    @Param('id') id: number,
  ) {
    return this.experienceCandidateServices.updateExperienceCandidateServices(
      experienceCandidateController,
      id,
    );
  }

  @Delete('/:id')
  deleteExperienceCandidateServices(@Param('id') id: number) {
    return this.experienceCandidateServices.deleteExperienceCandidateServices(
      id,
    );
  }
}
