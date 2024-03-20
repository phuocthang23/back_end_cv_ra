import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobDTO } from './dto/job.dto';

@Injectable()
export class JobServices {
  constructor(private jobService: JobRepository) { }
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createJob(req: JobDTO): Promise<any> {
    const workingTime = this.convertDateFormat(req.working_time);
    const applicationDeadline = this.convertDateFormat(req.application_deadline);
    const convertData = {
      title: req.title,
      address: req.address,
      working_time: workingTime,
      application_deadline: applicationDeadline,
      wage: req.wage,
      level: req.level,
      description: req.description,
      companyId: req.companyId,
    };
    try {
      return await this.jobService.createJob(convertData);
    } catch (error) {
      throw new HttpException('Failed to create job', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getAllRoles(): Promise<{ data: any }> {
    return this.jobService.getAllRoles();
  }
}
