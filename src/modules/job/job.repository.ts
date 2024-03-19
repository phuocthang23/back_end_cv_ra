import { JobEntity } from './entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobDTO } from './dto/job.dto';
import { plainToClass } from 'class-transformer';

export class JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    public jobRepository: Repository<JobEntity>,
  ) { }

  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createJob(data: JobDTO): Promise<any> {
    const workingTime = this.convertDateFormat(data.working_time);
    const applicationDeadline = this.convertDateFormat(data.application_deadline);
    const convertData = {
      title: data.title,
      address: data.address,
      working_time: workingTime,
      application_deadline: applicationDeadline,
      wage: data.wage,
      level: data.level,
      description: data.description,
      companyId: data.companyId,
    };
    const jobEntity = plainToClass(JobEntity, convertData);
    this.jobRepository.create(jobEntity);
    await this.jobRepository.save(jobEntity);
    return {
      message: 'Created job successfully',
    };
  }

  async getAllRoles(): Promise<{ data: any }> {
    const data = await this.jobRepository.find();
    return { data };
  }
}
