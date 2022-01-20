import {EnumPostType} from "./postRequest";

export interface PostInterface{
  userName: string,
  email: string,
  postType: EnumPostType,
  createdAt: Date,
  message: string
}
