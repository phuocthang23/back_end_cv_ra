import { LanguageEntity } from './entities/language.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageDTO } from './dto/language.dto';
import { plainToClass } from 'class-transformer';
export class LanguageRepository {
  constructor(
    @InjectRepository(LanguageEntity)
    public languageRepository: Repository<LanguageEntity>,
  ) {}

  async createLanguage(data: LanguageDTO): Promise<any> {
    const introduceCandidatesEntity = plainToClass(LanguageDTO, data);
    this.languageRepository.create(introduceCandidatesEntity);
    return await this.languageRepository.save(introduceCandidatesEntity);
  }

  async getAllLanguage() {
    const data = await this.languageRepository.find();
    return data;
  }

  async getOneLanguage(id: number): Promise<any> {
    return await this.languageRepository.findOne({
      where: { id },
    });
  }

  async updateLanguage(data: any, id: number): Promise<any> {
    return await this.languageRepository.update(id, data);
  }

  async deleteLanguage(id: number): Promise<any> {
    return await this.languageRepository.delete(id);
  }
}
