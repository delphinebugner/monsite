import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): string {
    console.log("coucou");
    return 'Le début d\'une aventure incroyable <3';
  }
}
