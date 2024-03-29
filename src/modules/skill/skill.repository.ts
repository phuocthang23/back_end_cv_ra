import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillDTO } from './dto/skill.dto';
import { plainToClass } from 'class-transformer';
export class SkillRepository {
  constructor(
    @InjectRepository(SkillEntity)
    public skillRepository: Repository<SkillEntity>,
  ) {}

  async createSkill(data: SkillDTO): Promise<any> {
    const introduceCandidatesEntity = plainToClass(SkillEntity, data);
    this.skillRepository.create(introduceCandidatesEntity);
    return await this.skillRepository.save(introduceCandidatesEntity);
  }

  async getAllSkill() {
    const data = await this.skillRepository.find();
    return data;
  }

  async getOneSkill(id: number): Promise<any> {
    return await this.skillRepository.findOne({
      where: { id },
    });
  }

  async updateSkill(data: any, id: number): Promise<any> {
    return await this.skillRepository.update(id, data);
  }

  async deleteSkill(id: number): Promise<any> {
    return await this.skillRepository.delete(id);
  }
}
