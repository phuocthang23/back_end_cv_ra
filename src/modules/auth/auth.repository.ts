import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
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

  async register(data: any): Promise<any> {
    const createUser = this.userEntity.create(data);
    const response = await this.userEntity.save(createUser);
    return response;
  }

  async forgotPassword(data: any): Promise<any> {
    return await this.userEntity.update({ email: data.email }, { password: data.password });
  }
}
