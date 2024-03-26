import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CandidatesRepository } from './candidates.repository';
import { LoginDTO, RegisterDTO } from './dto/candidates.dto';
import * as bcrypt from 'bcryptjs';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import * as makeToken from 'uniqid';
@Injectable()
export class CandidatesServices {
  constructor(
    private readonly generateToken: GenerateToken,
    private candidatesRepository: CandidatesRepository,
  ) {}

  private convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  async login(req: LoginDTO) {
    const checkUser = await this.candidatesRepository.login(req);
    if (checkUser) {
      const isChecked =
        checkUser && bcrypt.compareSync(req.password, checkUser.password);
      const data = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.name,
      };
      const access_token = isChecked
        ? this.generateToken.signJwt({ data })
        : null;
      if (access_token !== null) {
        return {
          data,
          access_token,
        };
      } else {
        throw new HttpException(
          'Enter wrong email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Enter wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(req: RegisterDTO): Promise<any> {
    const checkUser = await this.candidatesRepository.checkCandidates(req);
    if (checkUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    try {
      const dob = this.convertDateFormat(req.dob);
      const hashPassword = (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const user = { ...req, password: hashPassword(req.password), dob };
      const response = await this.candidatesRepository.register(user);
      if (response) {
        return {
          success: true,
          message: 'Register successfully',
        };
      }
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  async getCandidates(email: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.candidatesRepository.getAllCandidates(email, limit, skip);
  }

  async getOneCandidates(id: number): Promise<any> {
    return await this.candidatesRepository.getOneCandidates(id);
  }
}
