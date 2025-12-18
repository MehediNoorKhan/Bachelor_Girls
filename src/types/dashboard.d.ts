export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
  code: number;
}

export interface DashboardData {
  totals: Totals;
  revenue: RevenueOverview;
  clients: ClientsOverview;
  transactions: TransactionsOverview;
}

export interface Totals {
  new_bookings: number;
  cancelled: number;
  rescheduled: number;
  this_week_bookings: number;
  this_week_total_revenue: number;
}

export interface RevenueOverview {
  current_week: RevenueByDayApi[];
  previous_week: RevenueByDayApi[];
}

export interface RevenueByDayApi {
  day: string;
  date: string; // "DD-MM-YYYY"
  revenue: number; // API returns numbers or string like "111.26"
}

export interface ClientsOverview {
  last_week: ClientDay[];
  by_month: ClientByMonth[];
  by_year: ClientByYear[];
}

export interface ClientDay {
  year?: number;
  month?: string;
  day?: string;
  date: string; // "DD-MM-YYYY"
  clients: number;
}

export interface ClientByMonth {
  month: string;
  year: number;
  clients: number;
}

export interface ClientByYear {
  year: number;
  clients: number;
}

export interface TransactionsOverview {
  completed: TransactionCompleted[];
  completed_percentage: number; // API returns "68.18"
  pending: TransactionPending[];
  pending_percentage: number; // API returns "31.82"
  total: string; // "1143.98"
}

export interface TransactionCompleted {
  customer_name: string;
  service_name: string;
  advance_amount: string; // "30.00"
  date: string; // "03-11-2025 04:25:50"
}

export interface TransactionPending {
  customer_name: string;
  service_name: string;
  due_amount: string; // "111.26" or "9.72"
  date: string;
}

/*
  Optional remaining types from the previous file kept for reuse elsewhere in the codebase.
  Keep them if other modules reference these shapes.
*/

export interface ReviewsData {
  owner_reviews: unknown[];
  owner_average_rating: number;
  service_reviews: unknown[];
  service_average_rating: number;
}

export interface BookingsData {
  total_booking: number;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM:SS"
  subtotal: string; // API may return as string, e.g. "105.26"
  total: number;
  advance: number;
  due: number;
  payment_status: string;
  payment_method: string;
  status: string;
  booking_type: string;
  service: Service;
  customer: User;
  owner: User;
  items: unknown[]; // item shape may vary
  location: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  duration: string;
  location: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface Review {
  id: number;
  customer_id: number;
  rating: number;
  comment: string;
  type: "positive" | "critical";
  user: User;
}

interface ReviewsResponse {
  owner_reviews: Review[];
  owner_average_rating: number;
  service_reviews: Review[];
  service_average_rating: number;
}
