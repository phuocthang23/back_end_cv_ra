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
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JobServices } from './job.service';
import { JobDTO } from './dto/job.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/job`)
export class JobController {
  constructor(private readonly jobService: JobServices) {}

  @Post('/')
  createJob(@Body() jobController: JobDTO): Promise<any> {
    return this.jobService.createJob(jobController);
  }

  @Get('/')
  async getAllJob(
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.jobService.getAllJob(title, page, limit);
  }

  @Get('/:id')
  async getOneJob(@Param('id') id: number): Promise<any> {
    return this.jobService.getOneJob(id);
  }

  @Put('/:id')
  updateJob(@Body() jobController: any, @Param('id') id: number) {
    return this.jobService.updateJob(jobController, id);
  }

  @Delete('/:id')
  deleteJob(@Param('id') id: number) {
    return this.jobService.deleteJob(id);
  }
}
