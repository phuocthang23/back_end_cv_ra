import { EducationCandidatesEntity } from './entities/educationCandidates.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
export class EducationCandidatesRepository {
  constructor(
    @InjectRepository(EducationCandidatesEntity)
    public educationRepository: Repository<EducationCandidatesEntity>,
  ) {}

  async createEducationCandidates(data: any): Promise<any> {
    const projectCandidatesEntity = plainToClass(
      EducationCandidatesEntity,
      data,
    );
    this.educationRepository.create(projectCandidatesEntity);
    return await this.educationRepository.save(projectCandidatesEntity);
  }

  async getAllEducationCandidates(name: string, limit: number, skip: number) {
    const data = await this.educationRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['candidates'],
    });
    return data;
  }

  async getOneEducationCandidates(id: number): Promise<any> {
    return await this.educationRepository.findOne({
      where: { id },
    });
  }

  async updateEducationCandidates(data: any, id: number): Promise<any> {
    return await this.educationRepository.update(id, data);
  }

  async deleteEducationCandidates(id: number): Promise<any> {
    return await this.educationRepository.delete(id);
  }
}
