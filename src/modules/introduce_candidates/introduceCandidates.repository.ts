import { IntroduceCandidatesEntity } from './entities/introduceCandidates.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IntroduceCandidatesDTO } from './dto/introduceCandidates.dto';
import { plainToClass } from 'class-transformer';
export class IntroduceCandidatesRepository {
  constructor(
    @InjectRepository(IntroduceCandidatesEntity)
    public introduceRepository: Repository<IntroduceCandidatesEntity>,
  ) {}

  async createIntroduceCandidates(data: IntroduceCandidatesDTO): Promise<any> {
    const introduceCandidatesEntity = plainToClass(
      IntroduceCandidatesEntity,
      data,
    );
    this.introduceRepository.create(introduceCandidatesEntity);
    return await this.introduceRepository.save(introduceCandidatesEntity);
  }

  async getAllIntroduceCandidates() {
    const data = await this.introduceRepository.find({
      relations: ['candidates'],
    });
    return data;
  }

  async getOneIntroduceCandidates(id: number): Promise<any> {
    return await this.introduceRepository.findOne({
      where: { id },
    });
  }

  async updateIntroduceCandidates(data: any, id: number): Promise<any> {
    return await this.introduceRepository.update(id, data);
  }

  async deleteIntroduceCandidates(id: number): Promise<any> {
    return await this.introduceRepository.delete(id);
  }
}
