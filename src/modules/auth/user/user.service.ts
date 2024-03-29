import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from '../dto/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}
  async changePassword(req: ChangePasswordDTO) {
    const checkUser = await this.userRepository.checkUser(req);
    const isChecked =
      checkUser && bcrypt.compareSync(req.oldPassword, checkUser.password);
    if (!isChecked) {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const user = { ...req, newPassword: hashPassword(req.newPassword) };
      this.userRepository.changPassword(user);
      return { message: 'Update password successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to update password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async softErase(email: any) {
    const checkUser = await this.userRepository.checkUser(email);
    if (checkUser === null) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const isBlock = checkUser.isBlock === true ? false : true;
      const result = await this.userRepository.softErase(checkUser.id, isBlock);
      if (result) {
        return {
          message: 'Delete user successfully',
        };
      }
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
