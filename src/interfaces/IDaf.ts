import { ICenter } from "./ICenters";
import { IProduct } from "./IProducts";
import { IResponse } from "./IResponse";


export interface IDaf {
  id: number;
  productId: number;
  centerId: number;
  product: IProduct;
  center: ICenter;
  adjustmentType: string;
  adjustmentValue: number;
  description: string;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string;
  createdAt: string;
}

export type IDafResponse = IResponse<IDaf>;
export type IDafListResponse = IResponse<IDaf[]>;
