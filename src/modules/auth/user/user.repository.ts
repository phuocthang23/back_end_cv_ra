import { UserEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
  ) {}

  async changPassword(req: any): Promise<any> {
    const updatedUser = await this.userEntity.update(
      { email: req.email },
      { password: req.newPassword },
    );
    return updatedUser;
  }

  async checkUser(req: any): Promise<any> {
    return this.userEntity.findOne({
      where: { email: req.email },
    });
  }

  async checkCardId(req: any): Promise<any> {
    return this.userEntity.findOne({
      where: { card_id: req.card_id },
    });
  }

  async softErase(id: number, isBlock: any): Promise<any> {
    return await this.userEntity.update(id, { isBlock });
  }
}
