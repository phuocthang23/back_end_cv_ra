import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import * as bcrypt from 'bcryptjs';
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
    private readonly generateToken: GenerateToken,
  ) { }

  async login(req: LoginDTO) {
    const options: FindOneOptions<UserEntity> = {
      where: { email: req.email },
      relations: ['role'],
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser) {
      const isChecked =
        checkUser && bcrypt.compareSync(req.password, checkUser.password);
      const dataGenerateToken = {
        id: checkUser.id,
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role?.role,
      };
      console.log(dataGenerateToken)
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


  async register(data: any): Promise<any> {
    const options: FindOneOptions<UserEntity> = {
      where: { email: data.email },
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser === null) {
      const createUser = this.userEntity.create(data);
      const response = await this.userEntity.save(createUser);
      return response;
    }
    return false;
  }
}
