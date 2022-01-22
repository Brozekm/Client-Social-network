export enum EnumOnlineStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE"
}

export interface OnlineFriendInterface {
  email: string,
  userName: string,
  status: EnumOnlineStatus
}
