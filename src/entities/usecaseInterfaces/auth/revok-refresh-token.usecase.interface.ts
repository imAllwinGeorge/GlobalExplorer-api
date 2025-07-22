export interface IRevokeRefreshTokenUsecase {
  execute(refreshToken: string): Promise<void>;
}
