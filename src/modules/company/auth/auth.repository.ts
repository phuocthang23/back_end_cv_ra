import { CompanyEntity } from '../entities/company.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCompanyDTO } from '../dto/company.dto';
export class AuthCompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    public authCompanyEntity: Repository<CompanyEntity>,
  ) {}

  async login(req: LoginCompanyDTO) {
    const options: FindOneOptions<CompanyEntity> = {
      where: { email: req.email },
      relations: ['role'],
    };
    return await this.authCompanyEntity.findOne(options);
  }

  async register(data: any): Promise<any> {
    const createCompany = this.authCompanyEntity.create(data);
    const response = await this.authCompanyEntity.save(createCompany);
    return response;
  }

  async checkCardId(req: any): Promise<any> {
    return this.authCompanyEntity.findOne({
      where: { card_id: req.card_id },
    });
  }

  async forgotPassword(data: any): Promise<any> {
    return await this.authCompanyEntity.update(
      { email: data.email },
      { password: data.password },
    );
  }

  async checkAuthCompany(req: any): Promise<any> {
    return this.authCompanyEntity.findOne({
      where: { email: req.email },
    });
  }
}
