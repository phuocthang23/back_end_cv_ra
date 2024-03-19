import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { UserServices } from './user.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from './user.repository';
import { GenerateToken } from '../../shared/middlewares/generateToken';
import { UserEntity } from './entities/auth.entity';
import { UserController } from './user.controller';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [AuthController, UserController],
  imports: [TypeOrmModule.forFeature([UserEntity, AuthRepository, UserRepository])],
  providers: [AuthServices, UserServices, AuthRepository, UserRepository, GenerateToken, SharedDataService],
})
export class AuthModule { }
