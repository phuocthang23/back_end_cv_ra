import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { JobServices } from './job.service';
import { JobRepository } from './job.repository';
import { JobEntity } from './entities/job.entity';
@Module({
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([JobEntity, JobRepository])],
  providers: [JobServices, JobRepository],
})
export class JobModule { }
