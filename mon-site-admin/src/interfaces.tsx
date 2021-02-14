export interface ImageAdmin {
  year: string;
  month: string;
  src: string;
  title: string;
  description: string;
  tags: string;
}

export const defaultImage: ImageAdmin = {
  src: 'a.jpg',
  year: '2021',
  month: '01',
  title: 'Test',
  description: '',
  tags: 'paris',
};

export interface Image {
  id: number;
  src: string;
  title: string;
  description?: string;
}

export interface Field {
  id: keyof ImageAdmin;
  label: string;
  helper?: string;
}
