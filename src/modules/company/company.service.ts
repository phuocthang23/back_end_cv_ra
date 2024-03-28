import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyDTO } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private company: CompanyRepository) {}

  async createCompany(data: CompanyDTO): Promise<any> {
    const companyNameExists = await this.company.companyNameExists(data.name);
    if (companyNameExists) {
      throw new HttpException(
        'Company name already exists',
        HttpStatus.CONFLICT,
      );
    }
    try {
      await this.company.createCompany(data);
      return { message: 'Company created successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCompany(name: string, limit: number, page: number): Promise<any> {
    const skip = (page - 1) * limit;
    return await this.company.getAllCompany(name, limit, skip);
  }

  async getOneCompany(id: number): Promise<any> {
    return await this.company.getOneCompany(id);
  }

  async deteleCompany(id: number): Promise<any> {
    return await this.company.deteleCompany(id);
  }

  async updateUserById(id: number, data: CompanyDTO): Promise<any> {
    // return await this.company.updateUserById(id, data);
  }
}
