import { ClientSession, FilterQuery, Model, RootFilterQuery } from "mongoose";
import { IBaseRepository } from "../../entities/repositoryInterfaces/IBaseRepository.interface";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async find(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<T[]> {
    const query = this.model.find(filter);
    if (session) query.session(session);
    return query;
  }

  async findAll(limit: number, skip: number, filter: FilterQuery<object>) {
    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean() as Promise<object[]>,
      this.model.countDocuments(filter),
    ]);
    return { items, total };
  }

  async findOne(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<T | null> {
    console.log(4);
    const query = this.model.findOne(filter);
    if (session) query.session(session);
    return query;
  }

  async findById(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<T | null> {
    const query = this.model.findById(filter);
    if (session) query.session(session);
    return query;
  }

  async save(data: Partial<T>, session?: ClientSession): Promise<T> {
    const doc = new this.model(data);
    if (session) {
      await doc.save({ session });
    } else {
      await doc.save();
    }
    return doc;
  }

  async findOneAndUpdate(
    filter: FilterQuery<object>,
    value: object,
    session?: ClientSession,
  ): Promise<T | null> {
    const options: {
      new: boolean;
      session?: ClientSession;
    } = { new: true };

    if (session) {
      options.session = session;
    }

    return this.model.findOneAndUpdate(filter, { $set: value }, options);
  }

  async delete(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<void> {
    const query = this.model.findOneAndDelete(filter);
    if (session) query.session(session);
    await query.lean();
  }
  async countDocuments(filter: FilterQuery<T>, session?: ClientSession) {
    {
      const query = this.model.countDocuments(filter);
      if (session) query.session(session);
      return query;
    }
  }

  async findDetailsWithProjection(
    filter: FilterQuery<object>,
    projection: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<object> {
    const query = this.model.find(filter, projection);
    if (session) query.session(session);
    return query;
  }

  async isNameExist(
    field: string,
    name: string,
    session?: ClientSession,
  ): Promise<boolean> {
    const query = {
      [field]: { $regex: `^${name}$`, $options: "i" },
    } as unknown as RootFilterQuery<T>;
    const result = await this.model.findOne(query).session(session || null);
    return !!result;
  }
}
