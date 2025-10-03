export interface ICheckActivityBooking {
  execute(userId: string): Promise<boolean>;
}
