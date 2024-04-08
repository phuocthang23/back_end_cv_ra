import { SkillCandidatesEntity } from './entities/skillCandidates.entity';
import { Repository, ILike, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillCandidatesDTO } from './dto/skillCandidates.dto';
import { plainToClass } from 'class-transformer';
export class SkillCandidatesRepository {
  constructor(
    @InjectRepository(SkillCandidatesEntity)
    public skillRepository: Repository<SkillCandidatesEntity>,
  ) {}

  async createSkillCandidates(
    data: SkillCandidatesDTO,
    queryRunner: QueryRunner,
  ): Promise<any> {
    return await queryRunner.manager.save(
      plainToClass(SkillCandidatesEntity, data),
    );
  }

  async getAllSkillCandidates(name: string, limit: number, skip: number) {
    const data = await this.skillRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['candidates'],
    });
    return data;
  }

  async getOneSkillCandidates(id: number): Promise<any> {
    return await this.skillRepository.findOne({
      where: { id },
    });
  }

  async updateSkillCandidates(data: any, id: number): Promise<any> {
    return await this.skillRepository.update(id, data);
  }

  async deleteSkillCandidates(id: number): Promise<any> {
    return await this.skillRepository.delete(id);
  }
}
