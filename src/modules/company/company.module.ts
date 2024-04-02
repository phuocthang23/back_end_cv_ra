import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { AuthCompanyController } from './auth/auth.controller';
import { CompanyService } from './company.service';
import { AuthCompanyServices } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompanyRepository } from './company.repository';
import { AuthCompanyRepository } from './auth/auth.repository';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { EmailService } from 'src/shared/utils/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController, AuthCompanyController],
  providers: [
    CompanyService,
    AuthCompanyServices,
    CompanyRepository,
    GenerateToken,
    SharedDataService,
    AuthCompanyRepository,
    EmailService,
  ],
})
export class CompanyModule {}
