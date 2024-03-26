import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MysqlModule } from './database/config.module';
import { RoleModule } from './modules/roles/role.module';
import { CheckAuthenGuard } from './shared/guards/authen.guard';
import { CheckAuthorGuard } from './shared/guards/author.guard';
import { SharedDataService } from './shared/middlewares/shareData.service';
import { GenerateToken } from './shared/middlewares/generateToken';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { JobModule } from './modules/job/job.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { ProjectCandidatesModule } from './modules/project_candidates/projectCandidates.module';
import { SkillCandidatesModule } from './modules/skill_candidates/skillCandidates.module';
import { EducationCandidatesModule } from './modules/education_candidates/educationCandidates.module';
import { ExperienceCandidatesModule } from './modules/experience_candidate/experienceCandidates.module';
import { CertificateCandidatesModule } from './modules/certificate_candidate/certificateCandidate.module';
dotenv.config();

@Module({
  imports: [
    MysqlModule,
    CandidatesModule,
    RoleModule,
    AuthModule,
    JobModule,
    CompanyModule,
    ProjectCandidatesModule,
    SkillCandidatesModule,
    EducationCandidatesModule,
    ExperienceCandidatesModule,
    CertificateCandidatesModule,
  ],
  providers: [
    CheckAuthenGuard,
    GenerateToken,
    CheckAuthorGuard,
    SharedDataService,
  ],
})
export class AppModule {}
