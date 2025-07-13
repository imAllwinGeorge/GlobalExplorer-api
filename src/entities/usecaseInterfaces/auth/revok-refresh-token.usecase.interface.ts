export interface IRevokeRefreshTokenUsecaseInterface {
  execute(refreshToken: string): Promise<void>;
}
