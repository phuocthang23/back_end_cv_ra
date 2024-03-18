import { Controller, Post, Body } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JobServices } from './job.service';
import { JobDTO } from './dto/job.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/job`)
export class JobController {
  constructor(private readonly jobService: JobServices) { }

  @Post('/')
  job(@Body() jobController: JobDTO): Promise<any> {
    return this.jobService.createJob(jobController);
  }


}
