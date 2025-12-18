export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "rescheduled";

export interface MyBookingParams {
  booking_status?: BookingStatus;
  date?: string;
}

export interface RescheduleRequest {
  booking_id: number;
  time_slot_id: number;
  date: string;
  reason: string;
}

export interface CancelBookingRequest {
  booking_id: number;
  reason: string;
}

export interface IBooking {
  id: number;
  date: string;
  time: string;
  subtotal: string;
  total: number;
  advance: number;
  due: number;
  payment_status: "unpaid" | "paid" | "partial";
  payment_method: "stripe" | "cash" | "paypal" | string;
  status: "pending" | "confirmed" | "cancelled" | "rescheduled";
  booking_type: "standard" | string;
  service: {
    id: number;
    title: string;
    slug: string;
    price: number;
    image: string;
    duration: string;
  };
  customer: {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
  owner: {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
}

export interface IBookingHistory {
  date: string;
  time: string;
  title: string;
  location: string;
  status: "pending" | "confirmed" | "cancelled" | "rescheduled";
  booking_type: "standard" | string;
}
