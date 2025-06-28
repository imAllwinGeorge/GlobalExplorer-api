export interface ISendOtpUsecaseInterface {
  execute(email: string, role: string): Promise<string>;
}
