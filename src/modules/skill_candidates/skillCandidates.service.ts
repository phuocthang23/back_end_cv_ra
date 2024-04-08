import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SkillCandidatesRepository } from './skillCandidates.repository';
import { SkillCandidatesDTO } from './dto/skillCandidates.dto';
import { Connection } from 'typeorm';
@Injectable()
export class SkillCandidatesServices {
  constructor(
    private skillCandidatesRepository: SkillCandidatesRepository,
    private readonly connection: Connection,
  ) {}

  async createSkillCandidatesServices(
    req: any,
    candidatesId: number,
  ): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (
        req.every((data: any) => data.level_job_id) &&
        req.every((data: any) => data.name)
      ) {
        for (const data of req) {
          await this.skillCandidatesRepository.createSkillCandidates(
            { ...data, candidatesId },
            queryRunner,
          );
        }
        await queryRunner.commitTransaction();
        return {
          message: 'Created Skill Candidates successfully',
        };
      } else {
        throw new HttpException(
          'Failed to create Skill Candidates - Missing fields in one or more elements',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Failed to create Skill Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getAllSkillCandidatesServices(
    title: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    return await this.skillCandidatesRepository.getAllSkillCandidates(
      title,
      limit,
      skip,
    );
  }

  async getOneSkillCandidatesServices(id: number): Promise<any> {
    return await this.skillCandidatesRepository.getOneSkillCandidates(id);
  }

  async updateSkillCandidatesServices(data: any, id: number): Promise<any> {
    const response =
      await this.skillCandidatesRepository.getOneSkillCandidates(id);
    if (response === null) {
      throw new HttpException('Skill not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.skillCandidatesRepository.updateSkillCandidates(
        data,
        id,
      );
      if (result) {
        return {
          message: 'Updated Skill successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSkillCandidatesServices(id: number): Promise<any> {
    const response =
      await this.skillCandidatesRepository.getOneSkillCandidates(id);
    if (response === null) {
      throw new HttpException('skill not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.skillCandidatesRepository.deleteSkillCandidates(id);
      if (result) {
        return {
          message: 'Delete skill successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
