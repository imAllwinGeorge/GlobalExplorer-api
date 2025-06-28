export interface IVerifyTokenUsecaseInterface {
  execute(token: string, tole: string): Promise<boolean>;
}
