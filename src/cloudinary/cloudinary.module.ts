import { Module } from '@nestjs/common';
import { cloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from "./cloudinary.controller";

@Module({
  controllers: [CloudinaryController],
  providers: [cloudinaryProvider, CloudinaryService],
  exports: [cloudinaryProvider],
})
export class CloudinaryModule {}
