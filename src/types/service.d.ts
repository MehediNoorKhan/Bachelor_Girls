export interface ServiceParams {
  page?: number;
  limit?: number;
  category_id?: string[];
  owner_id?: string;
  location?: string;
  date?: string;
  max_price?: string;
  min_price?: string;
  zip_code?: string;
  type?: string;
}

export interface ITimeSlot {
  id: number;
  time: string;
  disable: boolean;
  message?: string | null;
}

export interface TimeSlotQuery {
  service_id: number;
  date: string;
}
export interface IService {
  id: number;
  category_id: string;
  category_name: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  discount?: number;
  location: string;
  lat: string;
  long: string;
  zip_code: string | null;
  slug: string;
  service_at: string;
  image: string | File;
  ratings: number;
  total_reviews: number;
  more_images: string[];
  owner: {
    id: number;
    name: string;
    avatar: string;
    category_id: string;
  };
  minimum_deposite: number;
  time_slots: ITimeSlot[];
  unavailable_slots: string[];
  created_at: string;
}
