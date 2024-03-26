import { CertificateCandidatesEntity } from './entities/certificateCandidate.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
export class CertificateCandidatesRepository {
  constructor(
    @InjectRepository(CertificateCandidatesEntity)
    public certificateCandidatesRepository: Repository<CertificateCandidatesEntity>,
  ) {}

  async createCertificateCandidates(data: any): Promise<any> {
    const certificateCandidatesEntity = plainToClass(
      CertificateCandidatesEntity,
      data,
    );
    this.certificateCandidatesRepository.create(certificateCandidatesEntity);
    return await this.certificateCandidatesRepository.save(
      certificateCandidatesEntity,
    );
  }

  async getAllCertificateCandidates(name: string, limit: number, skip: number) {
    const data = await this.certificateCandidatesRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
      relations: ['candidates'],
    });
    return data;
  }

  async getOneCertificateCandidates(id: number): Promise<any> {
    return await this.certificateCandidatesRepository.findOne({
      where: { id },
    });
  }

  async updateCertificateCandidates(data: any, id: number): Promise<any> {
    return await this.certificateCandidatesRepository.update(id, data);
  }

  async deleteCertificateCandidates(id: number): Promise<any> {
    return await this.certificateCandidatesRepository.delete(id);
  }
}
