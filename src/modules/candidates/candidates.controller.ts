import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  UploadedFile,
  ParseIntPipe,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CandidatesServices } from './candidates.service';
import { LoginDTO, RegisterDTO } from './dto/candidates.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../shared/upload-Image/cloudinary.service';
dotenv.config();
@Controller(`${process.env.API_KEY}/candidates`)
export class CandidateController {
  constructor(
    private readonly candidatesService: CandidatesServices,
    private cloudinaryService: CloudinaryService,
  ) {}

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

  @UseInterceptors(FileInterceptor('avatar'))
  @Put('/:id')
  async updateCandidates(
    @Body() candidatesController: any,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const avatar: any = await this.cloudinaryService.uploadSingleFile(file);
    const data = { ...candidatesController, avatar: avatar.url };
    const result = this.candidatesService.updateCandidates(data, id);
    return result;
  }
}
