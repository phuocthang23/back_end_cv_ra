import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleServices } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './entities/role.entity';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleRepository])],
  providers: [RoleServices, RoleRepository, GenerateToken, SharedDataService],
})
export class RoleModule {}
