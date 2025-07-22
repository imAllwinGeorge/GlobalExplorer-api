export interface IEmailSevices {
  sendOtp(email: string, subject: string, text: string): Promise<void>;
}
