import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillCandidatesController } from './skillCandidates.controller';
import { SkillCandidatesServices } from './skillCandidates.service';
import { SkillCandidatesRepository } from './skillCandidates.repository';
import { SkillCandidatesEntity } from './entities/skillCandidates.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [SkillCandidatesController],
  imports: [
    TypeOrmModule.forFeature([
      SkillCandidatesEntity,
      SkillCandidatesRepository,
    ]),
  ],
  providers: [
    SkillCandidatesServices,
    SkillCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class SkillCandidatesModule {}
