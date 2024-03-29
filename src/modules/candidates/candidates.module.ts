import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './entities/candidates.entity';
import { CandidateController } from './candidates.controller';
import { CandidatesServices } from './candidates.service';
import { CandidatesRepository } from './candidates.repository';
import { GenerateToken } from '../../shared/middlewares/generateToken';

@Module({
  controllers: [CandidateController],
  imports: [
    TypeOrmModule.forFeature([
      CandidateEntity,
      CandidatesServices,
      CandidatesRepository,
    ]),
  ],
  providers: [CandidatesServices, CandidatesRepository, GenerateToken],
})
export class CandidatesModule {}
