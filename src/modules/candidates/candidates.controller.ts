import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CandidatesServices } from './candidates.service';
import { LoginDTO, RegisterDTO } from './dto/candidates.dto';

dotenv.config();
@Controller(`${process.env.API_KEY}/candidates`)
export class CandidateController {
  constructor(private readonly candidatesService: CandidatesServices) {}

  @Post('/login')
  login(@Body() loginController: LoginDTO): Promise<any> {
    const result = this.candidatesService.login(loginController);
    return result;
  }

  @Post('/register')
  register(@Body() registerController: RegisterDTO): Promise<any> {
    const req = { ...registerController };
    return this.candidatesService.register(req);
  }

  @Get('/')
  async getAllCandidates(
    @Query('title') email: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.candidatesService.getCandidates(email, page, limit);
  }

  @Get('/:id')
  async getOneCandidates(@Param('id') id: number) {
    return this.candidatesService.getOneCandidates(id);
  }
}
