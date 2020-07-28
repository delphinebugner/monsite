import {Controller, Get, Inject} from '@nestjs/common';
import {CloudinaryService} from './cloudinary.service';

@Controller('cloud')
export class CloudinaryController {
  constructor(private readonly cloudinaryService :CloudinaryService ) {}

  @Get('')
  getHello() :string {
    return process.env.CLOUDINARY_URL ;
  }

  @Get('sample')
  getSampleUrl() :string {
    return this.cloudinaryService.getSample();
  }
}
