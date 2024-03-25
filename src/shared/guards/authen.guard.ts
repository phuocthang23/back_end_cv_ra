import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GenerateToken } from '../middlewares/generateToken';
import { SharedDataService } from '../middlewares/shareData.service';

@Injectable()
export class CheckAuthenGuard implements CanActivate {
  constructor(
    private loginService: GenerateToken,
    private sharedDataService: SharedDataService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const { headers } = request;
      const headerString = headers.authorization.split(' ');
      const currentToken = await this.loginService.verifyJwt(headerString[1]);

      this.sharedDataService.setCurrentToken(currentToken);
      return currentToken ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}
