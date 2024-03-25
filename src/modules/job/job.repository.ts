import { JobEntity } from './entities/job.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobDTO } from './dto/job.dto';
import { plainToClass } from 'class-transformer';
export class JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    public jobRepository: Repository<JobEntity>,
  ) {}

  async createJob(data: JobDTO): Promise<any> {
    const jobEntity = plainToClass(JobEntity, data);
    this.jobRepository.create(jobEntity);
    return await this.jobRepository.save(jobEntity);
  }

  async getAllJob(title: string, limit: number, skip: number) {
    const response = await this.jobRepository.findAndCount({
      where: title ? { title: ILike(`%${title}%`) } : {},
      skip,
      take: limit,
    });
    const [data, total] = response;
    return { data, total };
  }

  async getOneJob(id: number): Promise<any> {
    return await this.jobRepository.findOne({
      where: { id },
    });
  }

  async updateJob(data: any, id: number): Promise<any> {
    return await this.jobRepository.update(id, data);
  }

  async deleteJob(id: number): Promise<any> {
    return await this.jobRepository.delete(id);
  }
}
