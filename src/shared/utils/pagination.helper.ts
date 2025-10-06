import { Request } from "express";

export interface PaginationParams {
  limit: number;
  skip: number;
}

export function getPaginationParams(req: Request): PaginationParams {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.max(parseInt(req.query.limt as string) || 10, 1);
  const skip = (page - 1) * limit;

  return { limit, skip };
}

export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}
