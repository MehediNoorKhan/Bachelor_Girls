export interface IProviderProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  description: string | null;
}

export interface IReview {
  id: number;
  customer_id: number;
  reviewable_type: string;
  reviewable_id: number;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface ReviewsResponse {
  reviews: IReview[];
  total_review: number;
}

export interface ReviewParams {
  owner_id: string;
  reviewable_id?: number;
}

export interface PostReviewData {
  reviewable_id: number;
  reviewable_type: string;
  rating: number;
  comment: string;
}
