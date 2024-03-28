import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IntroduceCandidatesRepository } from './introduceCandidates.repository';

@Injectable()
export class IntroduceCandidatesServices {
  constructor(
    private introduceCandidatesServices: IntroduceCandidatesRepository,
  ) {}
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createIntroduceCandidates(req: any): Promise<any> {
    try {
      await this.introduceCandidatesServices.createIntroduceCandidates(req);
      return {
        message: 'Created Introduce Candidates successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create Introduce Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllIntroduceCandidates() {
    return await this.introduceCandidatesServices.getAllIntroduceCandidates();
  }

  async getOneIntroduceCandidates(id: number): Promise<any> {
    return await this.introduceCandidatesServices.getOneIntroduceCandidates(id);
  }

  async updateIntroduceCandidates(data: any, id: number): Promise<any> {
    const response =
      await this.introduceCandidatesServices.getOneIntroduceCandidates(id);
    if (response === null) {
      throw new HttpException('Introduce not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.introduceCandidatesServices.updateIntroduceCandidates(
          data,
          id,
        );
      if (result) {
        return {
          message: 'Updated Introduce successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Introduce not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteIntroduceCandidates(id: number): Promise<any> {
    const response =
      await this.introduceCandidatesServices.getOneIntroduceCandidates(id);
    if (response === null) {
      throw new HttpException('Introduce not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.introduceCandidatesServices.deleteIntroduceCandidates(id);
      if (result) {
        return {
          message: 'Delete Introduce successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Introduce not found', HttpStatus.BAD_REQUEST);
    }
  }
}
