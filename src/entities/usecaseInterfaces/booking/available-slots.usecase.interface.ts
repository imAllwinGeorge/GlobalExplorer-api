export interface IAvailableSlotUsecase {
  execute(hostId: string): Promise<
    {
      activityId: string;
      activityName: string;
      availability: { date: string; availableSeats: number }[];
    }[]
  >;
}
