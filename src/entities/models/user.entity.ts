export interface IUserEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  role: "user" | "admin" | "host";
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
