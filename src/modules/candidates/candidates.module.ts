import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './entities/candidates.entity';
import { CandidateController } from './candidates.controller';
import { CandidatesServices } from './candidates.service';
import { CandidatesRepository } from './candidates.repository';
import { GenerateToken } from '../../shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CloudinaryModule } from 'src/shared/upload-Image/cloudinary.module';

@Module({
  controllers: [CandidateController],
  imports: [
    TypeOrmModule.forFeature([
      CandidateEntity,
      CandidatesServices,
      CandidatesRepository,
    ]),
    CloudinaryModule,
  ],
  providers: [
    CandidatesServices,
    CandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class CandidatesModule {}
