export interface IActivityEntity {
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
  location: [number, number];
  images: string[];
  reportingPlace: string;
  reportingTime: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
