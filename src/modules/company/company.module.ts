import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
