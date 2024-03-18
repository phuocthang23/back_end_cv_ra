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
dotenv.config();
const PORT = process.env.API_KEY;

@Module({
  imports: [MysqlModule, RoleModule, AuthModule, JobModule, CompanyModule],
  providers: [
    CheckAuthenGuard,
    GenerateToken,
    CheckAuthorGuard,
    SharedDataService,
  ],
})
export class AppModule {}
