import { IResponse } from "./IResponse";
import { IUserProfile } from "./IUserProfile";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileId: number;
  profile: IUserProfile;
}
export type IUserResponse = IResponse<IUser>;
export type IUserListResponse = IResponse<IUser[]>;
