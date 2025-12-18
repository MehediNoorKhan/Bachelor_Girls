export interface CalendarResponse {
  total_booking: number;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  subtotal: string;
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
  items: BookingItem[];
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
