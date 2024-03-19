import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDTO } from './dto/auth.dto';
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        public userEntity: Repository<UserEntity>,
    ) { }

    async changPassword(req: any): Promise<any> {
        const updatedUser = await this.userEntity.update({ email: req.email }, { password: req.newPassword });
        return updatedUser
    }
    async checkUser(req: any): Promise<any> {
        return this.userEntity.findOne({
            where: { email: req.email }
        });
    }
}
