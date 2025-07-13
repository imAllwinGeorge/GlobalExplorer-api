export interface IRefreshTokenEntity {
  userId: string;
  userType: string;
  refreshToken: string;
  expiredAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
