import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/auth.dto';
import { GenerateToken } from 'src/shared/middlewares/generateToken';

export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
    private readonly generateToken: GenerateToken,
  ) {}

  async login(req: LoginDTO) {
    const options: FindOneOptions<UserEntity> = {
      where: { email: req.email },
      relations: ['role'],
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser) {
      const isChecked = checkUser.password === req.password;
      const dataGenerateToken = {
        id: checkUser.id,
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role?.role,
      };
      const access_token = isChecked
        ? this.generateToken.signJwt({ dataGenerateToken })
        : null;
      if (access_token !== null) {
        return {
          success: true,
          data: dataGenerateToken,
          access_token,
        };
      } else {
        return {
          success: false,
          message: 'Enter wrong password',
        };
      }
    }
    return false;
  }
}
