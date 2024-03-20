import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/auth.dto';
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
  ) { }

  async login(req: LoginDTO) {
    const options: FindOneOptions<UserEntity> = {
      where: { email: req.email },
      relations: ['role'],
    };
    return await this.userEntity.findOne(options);
  }


  async register(data): Promise<any> {
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
