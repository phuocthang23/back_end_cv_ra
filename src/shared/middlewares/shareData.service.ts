import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedDataService {
  private currentToken: any;

  setCurrentToken(token: any) {
    this.currentToken = token;
  }

  getCurrentToken() {
    return this.currentToken;
  }
}
