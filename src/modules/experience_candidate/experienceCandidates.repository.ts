import { ExperienceCandidatesEntity } from './entities/experienceCandidates.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
export class ExperienceCandidatesRepository {
  constructor(
    @InjectRepository(ExperienceCandidatesEntity)
    public jobRepository: Repository<ExperienceCandidatesEntity>,
  ) {}

  async createExperienceCandidates(data: any): Promise<any> {
    const projectCandidatesEntity = plainToClass(
      ExperienceCandidatesEntity,
      data,
    );
    this.jobRepository.create(projectCandidatesEntity);
    return await this.jobRepository.save(projectCandidatesEntity);
  }

  async getAllExperienceCandidates(
    position: string,
    limit: number,
    skip: number,
  ) {
    const data = await this.jobRepository.find({
      where: position ? { position: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['candidates'],
    });
    return data;
  }

  async getOneExperienceCandidates(id: number): Promise<any> {
    return await this.jobRepository.findOne({
      where: { id },
    });
  }

  async updateExperienceCandidates(data: any, id: number): Promise<any> {
    return await this.jobRepository.update(id, data);
  }

  async deleteExperienceCandidates(id: number): Promise<any> {
    return await this.jobRepository.delete(id);
  }
}
