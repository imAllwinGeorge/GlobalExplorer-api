export interface IAdminEntity {
  email: string;
  password: string;
  role: "user" | "admin" | "host";
  isBlocked: boolean;
}
