type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  _id: number | string;
  title: string;
  paragraph: string;
  image: string;
  content: string;
  createdTime: string;
  author: Author;
  image_url: string;
  created_at: string;
  views: number;
  updated_at: string;
  excerpt: string;
  slug: string;
  tags: string | string[];
  category?: string;

};
