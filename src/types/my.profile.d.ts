export interface ProfileFormValues {
  profile_picture?: string | File | null;
  name: string;
  phone: string;
  about_me: string;
  description: string;
}

export interface IDue {
  id: number;
  customer: string;
  invoice_no: string;
  service: string;
  service_at: string;
  date: string;
  requested_amount: string;
  requested_at: string;
  full_payable_amount: string;
  total: number;
  note: string;
}

export interface DuePaymentData {
  due_id: string;
  type?: string;
}

export interface DuePaymentResponse {
  checkout_url: string;
}

export interface UpdatePasswordRequest {
  old_password: string;
  password: string;
  password_confirmation: string;
}
