import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    this.cloudinary.v2.config({
      cloud_name: 'helacbtft',
      api_key: '695341215467285',
      api_secret: 'CfMjZJCK2_Q2-rj1h5kWtXxReAs'
    });
  };
  getSample() :string{
    return this.cloudinary.v2.url('sample.jpg');
  }
}
