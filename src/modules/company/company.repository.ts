import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CompanyDTO } from './dto/company.dto';

export class CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity) private company: Repository<CompanyEntity>,
  ) {}

  async createCompany(data: CompanyDTO): Promise<any> {
    return await this.company.save(data);
  }

  async companyNameExists(companyName: string): Promise<boolean> {
    const existingCompany = await this.company.findOne({
      where: { companyName },
    });
    return !!existingCompany;
  }

  async getAllCompany(): Promise<any> {
    return await this.company.find();
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
