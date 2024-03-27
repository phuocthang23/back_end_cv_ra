import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { CompanyDTO } from './dto/company.dto';

export class CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity) private company: Repository<CompanyEntity>,
  ) {}

  async createCompany(data: CompanyDTO): Promise<any> {
    return await this.company.save(data);
  }

  async companyNameExists(name: string): Promise<boolean> {
    const existingCompany = await this.company.findOne({
      where: { name },
    });
    return !!existingCompany;
  }

  async getAllCompany(name: string, limit: number, skip: number): Promise<any> {
    const response = await this.company.findAndCount({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['jobs'],
    });
    const [data, total] = response;
    return { data, total };
  }

  async getOneCompany(id: number): Promise<any> {
    return await this.company.findOneBy({ id });
  }

  async deteleCompany(id: number): Promise<any> {
    return await this.company.delete(id);
  }

  async updateUserById(id: number, data: CompanyEntity): Promise<any> {
    return await this.company.update(id, data);
  }
}
