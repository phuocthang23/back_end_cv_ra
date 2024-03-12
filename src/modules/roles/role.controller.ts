import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RoleServices } from './role.service';
import { RoleDTO } from './dto/role.dto';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
import { CheckAuthorGuard } from 'src/shared/guards/author.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/roles`)
// @UseGuards(CheckAuthenGuard)
// @UseGuards(CheckAuthorGuard)
export class RoleController {
  constructor(private readonly roleService: RoleServices) {}
  @Get()
  async getAllRoles(): Promise<{ data: RoleDTO }> {
    return this.roleService.getAllRoles();
  }
  // get all role

  @Get('/:id')
  getDetailRole(@Param('id') id: number): Promise<any> {
    return this.roleService.getOneRole(id);
  }
  // get one role

  @Post()
  createRole(@Body() roleDTO: RoleDTO): Promise<any> {
    return this.roleService.createRole(roleDTO);
  }
  // create role

  @Put('/:id')
  updateRole(@Body() roleDTO: RoleDTO, @Param('id') id: number): Promise<any> {
    return this.roleService.updateRole(roleDTO, id);
  }
  // update role

  @Delete('/:id')
  deleteRole(@Param('id') id: number): Promise<any> {
    return this.roleService.deleteRole(id);
  }
  // delete role
}
