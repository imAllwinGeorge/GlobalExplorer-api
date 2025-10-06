import { IBaseEntitiy } from "./base.entity";

export interface IActivityEntity extends IBaseEntitiy {
  activityName: string;
  itenary: string;
  maxCapacity: number;
  categoryId: string;
  pricePerHead: number;
  userId: string;
  street: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  location: {
    type?: string;
    coordinates: [number, number];
  };
  images: string[];
  recurrenceDays: string[];
  reportingPlace: string;
  reportingTime: string;
  isActive: boolean;
}
