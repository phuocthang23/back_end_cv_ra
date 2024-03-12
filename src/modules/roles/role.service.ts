import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleDTO } from './dto/role.dto';
// import { IsRoleInterface } from './interface/role.interface';
// import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class RoleServices {
  constructor(private roleRepo: RoleRepository) {}
  getAllRoles(): Promise<{ data: any }> {
    return this.roleRepo.getAllRoles();
  }

  getOneRole(id: number): Promise<any> {
    return this.roleRepo.getOneRole(id);
  }

  createRole(data: RoleDTO): Promise<any> {
    return this.roleRepo.createRole(data);
  }

  updateRole(data: RoleDTO, id: number): Promise<any> {
    return this.roleRepo.updateRole(data, id);
  }

  deleteRole(id: number): Promise<any> {
    return this.roleRepo.deleteRole(id);
  }
}
