import { IImage } from './IImage';

export interface IGalleryElement {
  id: string;
  title: string;
  route: string;
  image: IImage;
}
