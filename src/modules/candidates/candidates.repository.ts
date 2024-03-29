import { CandidateEntity } from './entities/candidates.entity';
import { FindOneOptions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/candidates.dto';
export class CandidatesRepository {
  constructor(
    @InjectRepository(CandidateEntity)
    public candidateEntity: Repository<CandidateEntity>,
  ) {}

  async login(req: LoginDTO) {
    const options: FindOneOptions<CandidateEntity> = {
      where: { email: req.email },
      relations: ['role'],
    };
    return await this.candidateEntity.findOne(options);
  }

  async register(data: any): Promise<any> {
    const createUser = this.candidateEntity.create(data);
    const response = await this.candidateEntity.save(createUser);
    return response;
  }

  async checkCandidates(req: any): Promise<any> {
    return this.candidateEntity.findOne({
      where: { email: req.email },
    });
  }

  async getAllCandidates(email: string, limit: number, skip: number) {
    const response = await this.candidateEntity.findAndCount({
      where: email ? { email: ILike(`%${email}%`) } : {},
      skip,
      take: limit,
      select: [
        'id',
        'name',
        'email',
        'phone',
        'gender',
        'address',
        'isOpen',
        'dob',
        'gender',
        'link_fb',
        'link_linkedin',
        'link_git',
        'avatar',
      ],
      relations: [
        'projectCandidates',
        'skillCandidates',
        'educationCandidates',
        'experienceCandidates',
        'certificateCandidates',
        'role',
        'introduceCandidates',
      ],
    });
    const [data, total] = response;
    return { data, total };
  }

  async getOneCandidates(id: number): Promise<any> {
    return await this.candidateEntity.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'phone',
        'gender',
        'address',
        'isOpen',
        'dob',
        'gender',
        'link_fb',
        'link_linkedin',
        'link_git',
        'avatar',
      ],
      relations: [
        'projectCandidates',
        'skillCandidates',
        'educationCandidates',
        'experienceCandidates',
        'certificateCandidates',
        'role',
        'introduceCandidates',
      ],
    });
  }

  async updateCandidates(data: any, id: number): Promise<any> {
    return await this.candidateEntity.update(id, data);
  }
}
