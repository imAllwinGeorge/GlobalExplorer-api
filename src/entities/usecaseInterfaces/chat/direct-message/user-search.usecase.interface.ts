import { ObjectId } from "mongoose";

export interface IUserSearchUsecase {
  execute(
    search: string,
  ): Promise<{ _Id: ObjectId; firstName: string; lastName: string }[]>;
}
