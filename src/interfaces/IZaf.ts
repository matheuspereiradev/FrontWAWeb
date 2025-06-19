import { ICenter } from "./ICenters";
import { IProduct } from "./IProducts";
import { IResponse } from "./IResponse";

export interface IZaf {
  id: number;
  productId: number;
  centerId: number;
  product: IProduct;
  center: ICenter;
  targetZone: 'Red' | 'Yellow' | 'Green' | string;
  adjustmentType: 'FlatValue' | 'Percentage' | string;
  adjustmentValue: number;
  description: string;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string;  
  createdAt: string;  
}

export type IZafResponse = IResponse<IZaf>;
export type IZafListResponse = IResponse<IZaf[]>;
