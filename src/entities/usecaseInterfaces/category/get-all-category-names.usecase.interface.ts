export interface IGetAllCategoryNameUsecase {
  execute(): Promise<{ _id: string; categoryName: string }[]>;
}
