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

  async createJob(data: JobDTO): Promise<any> {
    const jobEntity = plainToClass(JobEntity, data);
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
