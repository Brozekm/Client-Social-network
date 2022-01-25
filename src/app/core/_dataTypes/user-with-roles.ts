import {EnumRole} from "./user-interface";

export interface UserWithRoles{
  email: string,
  userName: string,
  roles: EnumRole[];
}
