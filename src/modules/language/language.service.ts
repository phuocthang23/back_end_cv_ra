import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageServices {
  constructor(private languageServices: LanguageRepository) {}

  async createLanguage(req: any): Promise<any> {
    try {
      await this.languageServices.createLanguage(req);
      return {
        message: 'Created language successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create language',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllLanguage() {
    return await this.languageServices.getAllLanguage();
  }

  async getOneLanguage(id: number): Promise<any> {
    return await this.languageServices.getOneLanguage(id);
  }

  async updateLanguage(data: any, id: number): Promise<any> {
    const response = await this.languageServices.getOneLanguage(id);
    if (response === null) {
      throw new HttpException('language not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.languageServices.updateLanguage(data, id);
      if (result) {
        return {
          message: 'Updated language successfully',
        };
      }
    } catch (error) {
      throw new HttpException('language not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteLanguage(id: number): Promise<any> {
    const response = await this.languageServices.getOneLanguage(id);
    if (response === null) {
      throw new HttpException('language not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.languageServices.deleteLanguage(id);
      if (result) {
        return {
          message: 'Delete language successfully',
        };
      }
    } catch (error) {
      throw new HttpException('skill not found', HttpStatus.BAD_REQUEST);
    }
  }
}
