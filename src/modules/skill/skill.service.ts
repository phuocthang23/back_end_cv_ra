import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillServices {
  constructor(private skillServices: SkillRepository) {}

  async createSkill(req: any): Promise<any> {
    try {
      await this.skillServices.createSkill(req);
      return {
        message: 'Created skill successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllSkill() {
    return await this.skillServices.getAllSkill();
  }

  async getOneSkill(id: number): Promise<any> {
    return await this.skillServices.getOneSkill(id);
  }

  async updateSkill(data: any, id: number): Promise<any> {
    const response = await this.skillServices.getOneSkill(id);
    if (response === null) {
      throw new HttpException('skill not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.skillServices.updateSkill(data, id);
      if (result) {
        return {
          message: 'Updated skill successfully',
        };
      }
    } catch (error) {
      throw new HttpException('skill not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSkill(id: number): Promise<any> {
    const response = await this.skillServices.getOneSkill(id);
    if (response === null) {
      throw new HttpException('skill not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.skillServices.deleteSkill(id);
      if (result) {
        return {
          message: 'Delete skill successfully',
        };
      }
    } catch (error) {
      throw new HttpException('skill not found', HttpStatus.BAD_REQUEST);
    }
  }
}
