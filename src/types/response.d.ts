export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code: number;
  statusCode?: number;
  pagination?: unknown;
  meta?: unknown;
}

export interface IError {
  data: Error;
}

export interface AuthResponse {
  user: {
    id: number;
    avatar: string;
    name: string;
    email: string;
    phone: string | null;
    about_me: string | null;
    description: string | null;
  };
  token: {
    headers: Record<string, string>;
    original: {
      access_token: string;
      token_type: string;
      expires_in: number | null;
    };
    exception: null | string;
  };
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  action: "forgot_password" | "email_verification";
}
