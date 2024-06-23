export interface SendOtpPayload {
  email: string;
  otp: string;
}

export interface ChangePasswordData {
  email: string;
  password: string;
}