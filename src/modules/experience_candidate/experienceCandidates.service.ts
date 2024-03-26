import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExperienceCandidatesRepository } from './experienceCandidates.repository';

@Injectable()
export class ExperienceCandidateServices {
  constructor(
    private experienceCandidatesRepository: ExperienceCandidatesRepository,
  ) {}
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createExperienceCandidateServices(req: any): Promise<any> {
    const started_at = this.convertDateFormat(req.started_at);
    const end_at = this.convertDateFormat(req.end_at);
    const convertData = {
      position: req.position,
      started_at,
      end_at,
      company: req.company,
      info: req.info,
      candidatesId: req.candidatesId,
    };
    try {
      await this.experienceCandidatesRepository.createExperienceCandidates(
        convertData,
      );
      return {
        message: 'Created experience Candidates successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create experience Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllExperienceCandidateServices(
    title: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    return await this.experienceCandidatesRepository.getAllExperienceCandidates(
      title,
      limit,
      skip,
    );
  }

  async getOneExperienceCandidateServices(id: number): Promise<any> {
    return await this.experienceCandidatesRepository.getOneExperienceCandidates(
      id,
    );
  }

  async updateExperienceCandidateServices(data: any, id: number): Promise<any> {
    const response =
      await this.experienceCandidatesRepository.getOneExperienceCandidates(id);
    if (response === null) {
      throw new HttpException('experience not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.experienceCandidatesRepository.updateExperienceCandidates(
          data,
          id,
        );
      if (result) {
        return {
          message: 'Updated experience successfully',
        };
      }
    } catch (error) {
      throw new HttpException('experience not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteExperienceCandidateServices(id: number): Promise<any> {
    const response =
      await this.experienceCandidatesRepository.getOneExperienceCandidates(id);
    if (response === null) {
      throw new HttpException('Job experience found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.experienceCandidatesRepository.deleteExperienceCandidates(
          id,
        );
      if (result) {
        return {
          message: 'Delete experience successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User experience found', HttpStatus.BAD_REQUEST);
    }
  }
}
