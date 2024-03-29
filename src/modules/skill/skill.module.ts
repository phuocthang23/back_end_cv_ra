import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillController } from './skill.controller';
import { SkillServices } from './skill.service';
import { SkillRepository } from './skill.repository';
import { SkillEntity } from './entities/skill.entity';
@Module({
  controllers: [SkillController],
  imports: [TypeOrmModule.forFeature([SkillEntity, SkillRepository])],
  providers: [SkillServices, SkillRepository],
})
export class SkillModule {}
