import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IntroduceCandidatesServices } from './introduceCandidates.service';
import { IntroduceCandidatesDTO } from './dto/introduceCandidates.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/authen.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/introduce_candidates`)
export class IntroduceCandidatesController {
  constructor(
    private readonly introduceCandidatesServices: IntroduceCandidatesServices,
    private sharedDataService: SharedDataService,
  ) {}
  @UseGuards(CheckAuthenGuard)
  @Post('/')
  async createIntroduceCandidates(
    @Body() introduceCandidatesController: IntroduceCandidatesDTO,
  ): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...introduceCandidatesController,
      candidatesId: currentToken.data.id,
    };
    return this.introduceCandidatesServices.createIntroduceCandidates(data);
  }

  @Get('/')
  async getAllIntroduceCandidates() {
    return this.introduceCandidatesServices.getAllIntroduceCandidates();
  }

  @Get('/:id')
  async getOneIntroduceCandidates(@Param('id') id: number): Promise<any> {
    return this.introduceCandidatesServices.getOneIntroduceCandidates(id);
  }

  @Put('/:id')
  updateIntroduceCandidates(
    @Body() projectCandidatesController: any,
    @Param('id') id: number,
  ) {
    return this.introduceCandidatesServices.updateIntroduceCandidates(
      projectCandidatesController,
      id,
    );
  }

  @Delete('/:id')
  deleteIntroduceCandidates(@Param('id') id: number) {
    return this.introduceCandidatesServices.deleteIntroduceCandidates(id);
  }
}
