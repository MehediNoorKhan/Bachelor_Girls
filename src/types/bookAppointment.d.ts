export interface IBookAppointment {
  service_id: number;
  time_slot_id: number;
  date: string;
  subtotal?: number;
  total?: number;
  advance: number;
  payment_method: "stripe";
}

export interface BookAppointmentResponse {
  checkout_url: string;
}

export interface IHistory {
  date: string;
  time: string;
  title: string;
  location: string;
  status: "pending" | "confirmed" | "cancelled" | string;
  booking_type: "standard" | string;
}

export interface BookingParams {
  page?: string;
}
