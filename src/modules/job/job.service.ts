import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobDTO } from './dto/job.dto';

@Injectable()
export class JobServices {
  constructor(private jobRepository: JobRepository) {}
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createJob(req: JobDTO): Promise<any> {
    const workingTime = this.convertDateFormat(req.expire_at);
    const convertData = {
      title: req.title,
      expire_at: workingTime,
      salary: req.salary,
      level: req.level,
      description: req.description,
      companyId: req.companyId,
    };
    try {
      await this.jobRepository.createJob(convertData);
      return {
        message: 'Created job successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create job',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllJob(title: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.jobRepository.getAllJob(title, limit, skip);
  }

  async getOneJob(id: number): Promise<any> {
    return await this.jobRepository.getOneJob(id);
  }

  async updateJob(data: any, id: number): Promise<any> {
    const response = await this.jobRepository.getOneJob(id);
    if (response === null) {
      throw new HttpException('Job not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.jobRepository.updateJob(data, id);
      if (result) {
        return {
          message: 'Updated job successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Job not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteJob(id: number): Promise<any> {
    const response = await this.jobRepository.getOneJob(id);
    if (response === null) {
      throw new HttpException('Job not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result = await this.jobRepository.deleteJob(id);
      if (result) {
        return {
          message: 'Delete job successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
