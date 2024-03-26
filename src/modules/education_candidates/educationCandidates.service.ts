import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EducationCandidatesRepository } from './educationCandidates.repository';
import { EducationCandidatesDTO } from './dto/educationCandidates.dto';

@Injectable()
export class EducationCandidatesServices {
  constructor(
    private educationCandidatesRepository: EducationCandidatesRepository,
  ) {}

  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createEducationCandidatesServices(req: any): Promise<any> {
    try {
      const started_at = this.convertDateFormat(req.started_at);
      const end_at = this.convertDateFormat(req.end_at);
      const convertData = {
        name: req.name,
        started_at,
        end_at,
        info: req.info,
        major: req.major,
        candidatesId: req.candidatesId,
      };
      await this.educationCandidatesRepository.createEducationCandidates(
        convertData,
      );
      return {
        message: 'Created Education Candidates successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create Education Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllEducationCandidatesServices(
    title: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    return await this.educationCandidatesRepository.getAllEducationCandidates(
      title,
      limit,
      skip,
    );
  }

  async getOneEducationCandidatesServices(id: number): Promise<any> {
    return await this.educationCandidatesRepository.getOneEducationCandidates(
      id,
    );
  }

  async updateEducationCandidatesServices(data: any, id: number): Promise<any> {
    const response =
      await this.educationCandidatesRepository.getOneEducationCandidates(id);
    if (response === null) {
      throw new HttpException('Education not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.educationCandidatesRepository.updateEducationCandidates(
          data,
          id,
        );
      if (result) {
        return {
          message: 'Updated Education successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Education not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteEducationCandidatesServices(id: number): Promise<any> {
    const response =
      await this.educationCandidatesRepository.getOneEducationCandidates(id);
    if (response === null) {
      throw new HttpException('Education not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.educationCandidatesRepository.deleteEducationCandidates(id);
      if (result) {
        return {
          message: 'Delete Education successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
