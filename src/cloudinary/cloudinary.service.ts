import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    // Hack pour environnement de dev - sur Heroku, la variable de cloudinary est bien settée ! TODO : à quel point les fichiers sources du serveur sont sécurisés ?
    if(process.env.NODE_ENV !== 'production' ){
      this.cloudinary.v2.config({
        cloud_name: 'helacbtft',
        api_key: '695341215467285',
        api_secret: 'CfMjZJCK2_Q2-rj1h5kWtXxReAs'
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
