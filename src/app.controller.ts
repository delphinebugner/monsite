import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return "YEAAAAH JE SUIS DANS LE VIDE !! ";
  }

  @Get('test')
  getTest(): string {
    console.log('test');
    return "Hey Girl!";
  }

  @Get('home')
  getHome(): string {
    return this.appService.getHome();
  }
}
