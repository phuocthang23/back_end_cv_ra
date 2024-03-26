import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceCandidateController } from './experienceCandidates.controller';
import { ExperienceCandidateServices } from './experienceCandidates.service';
import { ExperienceCandidatesRepository } from './experienceCandidates.repository';
import { ExperienceCandidatesEntity } from './entities/experienceCandidates.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [ExperienceCandidateController],
  imports: [
    TypeOrmModule.forFeature([
      ExperienceCandidatesEntity,
      ExperienceCandidatesRepository,
    ]),
  ],
  providers: [
    ExperienceCandidateServices,
    ExperienceCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class ExperienceCandidatesModule {}
