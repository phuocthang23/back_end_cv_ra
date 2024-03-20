import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { UserServices } from './user/user.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from './user/user.repository';
import { GenerateToken } from '../../shared/middlewares/generateToken';
import { UserEntity } from './entities/auth.entity';
import { UserController } from './user/user.controller';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { EmailService } from 'src/shared/utils/mail.service';
@Module({
  controllers: [AuthController, UserController],
  imports: [TypeOrmModule.forFeature([UserEntity, AuthRepository, UserRepository])],
  providers: [
    AuthServices,
    EmailService,
    UserServices,
    AuthRepository,
    UserRepository,
    GenerateToken,
    SharedDataService
  ],
})
export class AuthModule { }
