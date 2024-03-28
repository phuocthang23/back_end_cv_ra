import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntroduceCandidatesController } from './introduceCandidates.controller';
import { IntroduceCandidatesServices } from './introduceCandidates.service';
import { IntroduceCandidatesRepository } from './introduceCandidates.repository';
import { IntroduceCandidatesEntity } from './entities/introduceCandidates.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [IntroduceCandidatesController],
  imports: [
    TypeOrmModule.forFeature([
      IntroduceCandidatesEntity,
      IntroduceCandidatesRepository,
    ]),
  ],
  providers: [
    IntroduceCandidatesServices,
    IntroduceCandidatesRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class IntroduceCandidatesModule {}
