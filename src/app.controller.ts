import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  getHello(): string {
    return this.appService.getHome();
  }

  @Get('test')
  getTest(): string {
    console.log('test');
    return "Hey Girl!";
  }
}
