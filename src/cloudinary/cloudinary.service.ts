import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Cloudinary from 'cloudinary';


@Injectable()
export class CloudinaryService {
  constructor(private configService :ConfigService) {
    if(process.env.NODE_ENV !== 'production'){
      Cloudinary.v2.config({
        cloud_name: this.configService.get<string>('CLOUD_NAME'),
        api_key: this.configService.get<string>('API_KEY'),
        api_secret: this.configService.get<string>('API_SECRET')
      });
    }
  };

  getUrlSample() :string{
    return Cloudinary.v2.url('sample.jpg', {secure: true});
  };

  getUrl(name :string) :string {
    return Cloudinary.v2.url(name, {secure: true});
  }

  getUrlImageResized(name :string, width = -1, height = -1) :string{
    let transformation :Record<string, any> = { crop: "fill"} ;
    transformation = width > 0 ? {...transformation, width} : transformation;
    transformation = height > 0 ? {...transformation, height} : transformation;
    return Cloudinary.v2.url(name, { transformation, secure : true})
  }
}
