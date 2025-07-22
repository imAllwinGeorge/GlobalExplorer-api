export interface IForgotPasswordUsecase {
  execute(email: string, role: string): Promise<string>;
}
