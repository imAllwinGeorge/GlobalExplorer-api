export type EditActivityDTO = {
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
  recurrenceDays: string[];
  reportingPlace: string;
  reportingTime: string;
  location: number[];
  images: string[];
};
