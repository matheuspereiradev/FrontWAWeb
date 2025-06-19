import { IResponse } from "./IResponse";

export interface ICenter {
  id: number;
  code: string;
  description: string;
  city: string;
  zone: string;
}

export type ICenterResponse = IResponse<ICenter>;
export type ICenterListResponse = IResponse<ICenter[]>;
