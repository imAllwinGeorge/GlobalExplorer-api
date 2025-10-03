export interface IReviewEntity {
  entityId: string;
  userId: string;
  ratiing: number;
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
