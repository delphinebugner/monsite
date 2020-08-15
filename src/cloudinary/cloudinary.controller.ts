import {Controller, Get, Header, Param} from '@nestjs/common';
import {CloudinaryService} from './cloudinary.service';

@Controller('cloud')
export class CloudinaryController {
  constructor(private readonly cloudinaryService :CloudinaryService ) {}

  @Get('')
  getHello() :string {
    return 'Hello Cloud!';
  }

  @Get('sample')
  getSampleUrl() :string {
    return this.cloudinaryService.getUrlSample();
  }

  @Get('url/:name')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrl(@Param() params) :string {
    return this.cloudinaryService.getUrl(params.name);
  }

  @Get('url/:name/:size')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrlImageResizedSquare(@Param() params) :string {
    return this.cloudinaryService.getUrlImageResized(params.name, params.size, params.size);
  }
}
