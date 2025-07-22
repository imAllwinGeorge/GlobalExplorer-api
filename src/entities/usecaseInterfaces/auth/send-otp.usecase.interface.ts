export interface ISendOtpUsecase {
  execute(email: string, role: string): Promise<string>;
}
