export enum EnumRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface UserInterface {
  email: string,
  userName: string,
  jwttoken: string,
  role?: EnumRole;
}
