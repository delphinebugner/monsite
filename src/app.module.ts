import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule, ConfigModule.forRoot({
    envFilePath: '.development.env',
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
