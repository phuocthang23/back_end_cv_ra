import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CertificateCandidatesRepository } from './certificateCandidate.repository';

@Injectable()
export class CertificateCandidatesServices {
  constructor(
    private certificateCandidatesRepository: CertificateCandidatesRepository,
  ) {}
  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async createCertificateCandidates(req: any): Promise<any> {
    const started_at = this.convertDateFormat(req.started_at);
    const end_at = this.convertDateFormat(req.end_at);
    const convertData = {
      name: req.name,
      started_at,
      end_at,
      organization: req.organization,
      info: req.info,
      candidatesId: req.candidatesId,
    };
    try {
      await this.certificateCandidatesRepository.createCertificateCandidates(
        convertData,
      );
      return {
        message: 'Created Certificate Candidates successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create Certificate Candidates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllCertificateCandidates(
    title: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    return await this.certificateCandidatesRepository.getAllCertificateCandidates(
      title,
      limit,
      skip,
    );
  }

  async getOneCertificateCandidates(id: number): Promise<any> {
    return await this.certificateCandidatesRepository.getOneCertificateCandidates(
      id,
    );
  }

  async updateCertificateCandidates(data: any, id: number): Promise<any> {
    const response =
      await this.certificateCandidatesRepository.getOneCertificateCandidates(
        id,
      );
    if (response === null) {
      throw new HttpException('Certificate not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.certificateCandidatesRepository.updateCertificateCandidates(
          data,
          id,
        );
      if (result) {
        return {
          message: 'Updated Certificate successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Certificate not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCertificateCandidates(id: number): Promise<any> {
    const response =
      await this.certificateCandidatesRepository.getOneCertificateCandidates(
        id,
      );
    if (response === null) {
      throw new HttpException('Certificate not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const result =
        await this.certificateCandidatesRepository.deleteCertificateCandidates(
          id,
        );
      if (result) {
        return {
          message: 'Delete Certificate successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User Certificate found', HttpStatus.BAD_REQUEST);
    }
  }
}
