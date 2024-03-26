import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationCandidatesController } from './educationCandidates.controller';
import { EducationCandidatesServices } from './educationCandidates.service';
import { EducationCandidatesRepository } from './educationCandidates.repository';
import { EducationCandidatesEntity } from './entities/educationCandidates.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [EducationCandidatesController],
  imports: [
    TypeOrmModule.forFeature([
      EducationCandidatesEntity,
      EducationCandidatesRepository,
    ]),
  ],
  providers: [
    EducationCandidatesServices,
    EducationCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class EducationCandidatesModule {}
