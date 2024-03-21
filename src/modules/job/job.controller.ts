import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JobServices } from './job.service';
import { JobDTO } from './dto/job.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/job`)
export class JobController {
  constructor(private readonly jobService: JobServices) { }

  @Post('/')
  createJob(@Body() jobController: JobDTO): Promise<any> {
    return this.jobService.createJob(jobController);
  }

  @Get('/')
  async getAllRoles(): Promise<{ data: JobDTO }> {
    return this.jobService.getAllJob();
  }

  @Get('/:id')
  async getOneJob(@Param('id') id: number): Promise<any> {
    return this.jobService.getOneJob(id);
  }

  @Put('/:id')
  updateRole(@Body() jobController: any, @Param('id') id: number) {
    return this.jobService.updateJob(jobController, id);
  }

}
