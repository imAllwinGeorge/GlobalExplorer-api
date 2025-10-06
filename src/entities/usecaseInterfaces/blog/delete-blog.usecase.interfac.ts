export interface IDeleteBlogUsecase {
  execute(id: string): Promise<void>;
}
