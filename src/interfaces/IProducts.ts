import { IResponse } from "./IResponse";

export interface IProduct {
  reference: string;
  description: string;
  similar: string;
  unitOfMeasure: string;
  weight: number;
  volume: number;
  barcode: string;
  category: string;
  id: number;
  createdAt: string;
}

export type IProductResponse = IResponse<IProduct>;
export type IProductListResponse = IResponse<IProduct[]>;