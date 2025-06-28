export interface IForgotPasswordUsecaseInterface {
  execute(email: string, role: string): Promise<string>;
}
