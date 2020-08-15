import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary, private configService :ConfigService) {
    if(process.env.NODE_ENV !== 'production'){
      this.cloudinary.v2.config({
        cloud_name: this.configService.get<string>('CLOUD_NAME'),
        api_key: this.configService.get<string>('API_KEY'),
        api_secret: this.configService.get<string>('API_SECRET')
      });
    }
  };

  getUrlSample() :string{
    return this.cloudinary.v2.url('sample.jpg', {secure: true});
  };

  getUrl(name :string) :string {
    return this.cloudinary.v2.url(name, {secure: true});
  }

  getUrlImageResized(name :string, width :number, height :number) :string{
    return this.cloudinary.v2.url(name, { transformation: { width: width, height : height, crop: "fill"}, secure : true})
  }
}
