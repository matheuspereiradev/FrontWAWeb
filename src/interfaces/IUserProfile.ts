import { IResponse } from "./IResponse";
import { IUser } from "./IUser";

export interface IUserProfile {
    id: number;
    profileName: string;
    description: string;
    users: IUser[];
}
export type IUserProfileResponse = IResponse<IUserProfile>;
export type IUserProfileListResponse = IResponse<IUserProfile[]>;