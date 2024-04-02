import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { AuthCompanyRepository } from './auth/auth.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CompanyService {
  constructor(
    private company: CompanyRepository,
    private authCompany: AuthCompanyRepository,
  ) {}

  async createCompany(data: any): Promise<any> {
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

  async deleteCompany(id: number): Promise<any> {
    return await this.company.deleteCompany(id);
  }

  async changePassword(req: any) {
    const checkUser = await this.authCompany.checkAuthCompany(req);
    const isChecked =
      checkUser && bcrypt.compareSync(req.oldPassword, checkUser.password);
    if (!isChecked) {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const user = { ...req, newPassword: hashPassword(req.newPassword) };
      this.company.changPassword(user);
      return { message: 'Update password successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to update password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCompanyById(id: number, data: any): Promise<any> {
    await this.company.getOneCompany(id);
    try {
      await this.company.updateCompanyById(id, data);
      return {
        message: 'Company updated successfully',
      };
    } catch (error) {
      throw new HttpException('Company not found', HttpStatus.BAD_REQUEST);
    }
  }
}
