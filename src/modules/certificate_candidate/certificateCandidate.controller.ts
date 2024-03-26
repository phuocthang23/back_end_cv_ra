import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CertificateCandidatesServices } from './certificateCandidate.service';
import { CertificateCandidateDTO } from './dto/certificateCandidate.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/certificate_candidates`)
export class CertificateCandidatesController {
  constructor(
    private readonly certificateCandidatesServices: CertificateCandidatesServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createCertificateCandidates(
    @Body() projectCandidatesController: CertificateCandidateDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...projectCandidatesController,
      candidatesId: currentToken.data.id,
    };
    return this.certificateCandidatesServices.createCertificateCandidates(data);
  }

  @Get('/')
  async getAllCertificateCandidates(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 12;
    }
    return this.certificateCandidatesServices.getAllCertificateCandidates(
      name,
      page,
      limit,
    );
  }

  @Get('/:id')
  async getOneCertificateCandidates(@Param('id') id: number): Promise<any> {
    return this.certificateCandidatesServices.getOneCertificateCandidates(id);
  }

  @Put('/:id')
  updateCertificateCandidates(
    @Body() projectCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.certificateCandidatesServices.updateCertificateCandidates(
      projectCandidatesController,
      id,
    );
  }

  @Delete('/:id')
  deleteCertificateCandidates(@Param('id') id: number) {
    return this.certificateCandidatesServices.deleteCertificateCandidates(id);
  }
}
