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
    return this.cloudinary.v2.url('sample.jpg');
  };

  getUrl(name :string) :string {
    console.log("Cloudinary url request for", name)
    return this.cloudinary.v2.url(name);
  }

}
