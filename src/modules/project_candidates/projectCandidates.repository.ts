import { ProjectCandidatesEntity } from './entities/projectCandidates.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCandidatesDTO } from './dto/projectCandidates.dto';
import { plainToClass } from 'class-transformer';
export class ProjectCandidatesRepository {
  constructor(
    @InjectRepository(ProjectCandidatesEntity)
    public jobRepository: Repository<ProjectCandidatesEntity>,
  ) {}

  async createProjectCandidates(data: ProjectCandidatesDTO): Promise<any> {
    const projectCandidatesEntity = plainToClass(ProjectCandidatesEntity, data);
    this.jobRepository.create(projectCandidatesEntity);
    return await this.jobRepository.save(projectCandidatesEntity);
  }

  async getAllProjectCandidates(name: string, limit: number, skip: number) {
    const data = await this.jobRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['candidates'],
    });
    return data;
  }

  async getOneProjectCandidates(id: number): Promise<any> {
    return await this.jobRepository.findOne({
      where: { id },
    });
  }

  async updateProjectCandidates(data: any, id: number): Promise<any> {
    return await this.jobRepository.update(id, data);
  }

  async deleteProjectCandidates(id: number): Promise<any> {
    return await this.jobRepository.delete(id);
  }
}
