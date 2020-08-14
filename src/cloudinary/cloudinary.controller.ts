import {Controller, Get, Param} from '@nestjs/common';
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
    return this.cloudinaryService.getUrlSample();
  }

  @Get('url/:name')
  getUrl(@Param() params) :string {
    return this.cloudinaryService.getUrl(params.name);
  }
}
