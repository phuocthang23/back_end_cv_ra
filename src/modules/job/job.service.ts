import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobDTO } from './dto/job.dto';

@Injectable()
export class JobServices {
  constructor(private jobService: JobRepository) { }

  async createJob(req: JobDTO): Promise<any> {
    try {
      return await this.jobService.createJob(req);
    } catch (error) {
      throw new HttpException('Failed to create job', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
