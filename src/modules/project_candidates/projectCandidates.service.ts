import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectCandidatesRepository } from './projectCandidates.repository';
import { ProjectCandidatesDTO } from './dto/projectCandidates.dto';

@Injectable()
export class ProjectCandidatesServices {
  constructor(
    private projectCandidatesRepository: ProjectCandidatesRepository,
  ) {}
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createProjectCandidates(req: any): Promise<any> {
    const started_at = this.convertDateFormat(req.started_at);
    const end_at = this.convertDateFormat(req.end_at);
    const convertData = {
      name: req.name,
      started_at,
      end_at,
      link: req.link,
      info: req.info,
      candidatesId: req.candidatesId,
    };
    try {
      await this.projectCandidatesRepository.createProjectCandidates(
        convertData,
      );
      return {
        message: 'Created Project Candidates successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create Project Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllProjectCandidates(title: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.projectCandidatesRepository.getAllProjectCandidates(
      title,
      limit,
      skip,
    );
  }

  async getOneProjectCandidates(id: number): Promise<any> {
    return await this.projectCandidatesRepository.getOneProjectCandidates(id);
  }

  async updateProjectCandidates(data: any, id: number): Promise<any> {
    const response =
      await this.projectCandidatesRepository.getOneProjectCandidates(id);
    if (response === null) {
      throw new HttpException('Project not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.projectCandidatesRepository.updateProjectCandidates(
          data,
          id,
        );
      if (result) {
        return {
          message: 'Updated Project successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProjectCandidates(id: number): Promise<any> {
    const response =
      await this.projectCandidatesRepository.getOneProjectCandidates(id);
    if (response === null) {
      throw new HttpException('Project not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.projectCandidatesRepository.deleteProjectCandidates(id);
      if (result) {
        return {
          message: 'Delete Project successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User Project found', HttpStatus.BAD_REQUEST);
    }
  }
}
