import { Controller, Get, Header, Param } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloud')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('')
  getHello(): string {
    return 'Hello Cloud!';
  }

  @Get('sample')
  getSampleUrl(): string {
    return this.cloudinaryService.getUrlSample();
  }

  @Get('url/:name')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrl(@Param('name') name: string): string {
    return this.cloudinaryService.getUrl(name);
  }

  @Get('url/:name/:size')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrlImageResizedSquare(
    @Param('name') name: string,
    @Param('size') size: number,
  ): string {
    return this.cloudinaryService.getUrlImageResized(name, size, size);
  }

  @Get('url/:name/height/:size')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrlImageResizedHeight(
    @Param('name') name: string,
    @Param('size') size: number,
  ): string {
    return this.cloudinaryService.getUrlImageResized(name, -1, size);
  }

  @Get('url/:name/width/:size')
  @Header('Set-Cookie', 'SameSite=None, Secure')
  getUrlImageResizedWidth(
    @Param('name') name: string,
    @Param('size') size: number,
  ): string {
    return this.cloudinaryService.getUrlImageResized(name, size, -1);
  }
}
