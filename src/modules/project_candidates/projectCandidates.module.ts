import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCandidatesController } from './projectCandidates.controller';
import { ProjectCandidatesServices } from './projectCandidates.service';
import { ProjectCandidatesRepository } from './projectCandidates.repository';
import { ProjectCandidatesEntity } from './entities/projectCandidates.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [ProjectCandidatesController],
  imports: [
    TypeOrmModule.forFeature([
      ProjectCandidatesEntity,
      ProjectCandidatesRepository,
    ]),
  ],
  providers: [
    ProjectCandidatesServices,
    ProjectCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class ProjectCandidatesModule {}
