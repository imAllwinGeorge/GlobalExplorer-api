export interface IAdminEntity {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "user" | "admin" | "host";
  isBlocked: boolean;
}
