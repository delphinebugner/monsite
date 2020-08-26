export interface IImage {
  src: string;
  id: number;
  title: string;
  description?: string;
  tags?: string[];
  dateLabel?: string;
  year?: number;
  textPosition?:string;
}

export type srcUrl = {
  src: string;
  url: string;
}
