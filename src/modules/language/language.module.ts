import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './language.controller';
import { LanguageServices } from './language.service';
import { LanguageRepository } from './language.repository';
import { LanguageEntity } from './entities/language.entity';
@Module({
  controllers: [LanguageController],
  imports: [TypeOrmModule.forFeature([LanguageEntity, LanguageRepository])],
  providers: [LanguageServices, LanguageRepository],
})
export class LanguageModule {}
