export interface DueListItem {
  id: number;
  invoice_no: string;
  date: string; // ISO date (e.g. "2025-10-28")
  subtotal: string; // stringified decimal (e.g. "93.21")
  discount: string;
  tax: string;
  total: number;
  due: number;
  advance: number;
  status: "pending" | "paid" | "overdue" | string;
  service: string;
  service_at: "virtual" | "onsite" | string;
  timeSlot: string; // time (e.g. "11:37:00")
  customer: string;
  already_requested: "Yes" | "No" | string;
  booking_id?: string;
}

export type DueList = DueListItem[];

export interface DueRequestListItem {
  id: number;
  booking_id: number;
  invoice_no: string;
  date: string;
  subtotal: string;
  discount: string;
  tax: string;
  total: number;
  due: number;
  advance: number;
  status: "pending" | "paid" | "overdue" | string;
  service: string;
  service_at: string;
  timeSlot: string;
  customer: string;
  already_requested: "Yes" | "No" | string;
  requested_amount: string;
  full_due_amount: string;
  note: string;
  requested_at: string;
  status_request: "pending" | "approved" | "rejected" | string;
}

export type DueRequestList = DueRequestListItem[];
