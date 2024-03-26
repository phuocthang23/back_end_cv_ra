import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateCandidatesController } from './certificateCandidate.controller';
import { CertificateCandidatesServices } from './certificateCandidate.service';
import { CertificateCandidatesRepository } from './certificateCandidate.repository';
import { CertificateCandidatesEntity } from './entities/certificateCandidate.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [CertificateCandidatesController],
  imports: [
    TypeOrmModule.forFeature([
      CertificateCandidatesEntity,
      CertificateCandidatesRepository,
    ]),
  ],
  providers: [
    CertificateCandidatesServices,
    CertificateCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class CertificateCandidatesModule {}
