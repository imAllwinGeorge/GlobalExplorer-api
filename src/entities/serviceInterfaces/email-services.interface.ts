export interface IEmailSevicesInterface {
  sendOtp(email: string, subject: string, text: string): Promise<void>;
}
