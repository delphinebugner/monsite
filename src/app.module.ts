import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
