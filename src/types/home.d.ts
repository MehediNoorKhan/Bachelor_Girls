export interface IHome {
  title: string;
  image: string;
  categories: {
    [key: string]: string[];
  };
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
}

export interface ITopProvider {
  owner_id: number;
  name: string;
  avatar: string;
  about: string;
  email: string;
  avg_rating: number;
  category: string;
}
