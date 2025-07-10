export interface IGetAllCategoryNameUsecaseInterface {
  execute(): Promise<{ _id: string; categoryName: string }[]>;
}
