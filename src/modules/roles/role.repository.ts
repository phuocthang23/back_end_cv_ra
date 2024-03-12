import { RoleEntity } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from './dto/role.dto';
// import { IsRoleInterface } from './interface/role.interface';
// import { GlobalInterface } from 'src/shared/interface/global.interface';

export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    public roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles(): Promise<{ data: any }> {
    const data = await this.roleRepository.find();
    return { data };
  }

  getOneRole(id: number): Promise<any> {
    return this.roleRepository.findOneBy({ id });
  }

  async createRole(data: RoleDTO): Promise<any> {
    this.roleRepository.create(data);
    await this.roleRepository.save(data);
    return {
      success: true,
      message: 'Created role successfully',
    };
  }

  async updateRole(data: RoleDTO, id: number): Promise<any> {
    const updatedRole = await this.roleRepository.update(id, data);
    if (updatedRole.affected === 0) {
      return {
        success: false,
        message: 'Role updated failed',
      };
    }
    return {
      success: true,
      message: 'Role updated successfully',
    };
  }

  async deleteRole(id: number): Promise<any> {
    let roleItem = await this.roleRepository.findOneBy({ id });
    if (!roleItem) {
      return {
        success: false,
        message: 'Role not found',
      };
    }

    this.roleRepository.delete(id);
    return {
      success: true,
      message: 'Delete role successfully',
    };
  }
}
