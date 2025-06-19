import { IBufferProfile } from "./IBufferProfile";
import { ICenter } from "./ICenters";
import { IProduct } from "./IProducts";
import { IResponse } from "./IResponse";

export interface ICenterProduct {
  stock: number;
  product?: IProduct;
  center?: ICenter;
  bufferProfile?: IBufferProfile;
  centerId: number;
  productId: number;
  packageQuantity: number;
  minimumOrderQuantity: number;
  cost: number;
  leadTime: number;
  adu: number;
  futureAdu: number;
  standardDeviation: number;
  frequency: number;
  variabilityCoefficient: number;
  aduDays: number;
  bufferDdmrpRedBase: number;
  bufferDdmrpRedSafety: number;
  bufferDdmrpYellow: number;
  bufferDdmrpGreen: number;
  qualifiedSpike: number;
  checkUseSuggestedLtFactor: boolean;
  checkUseSuggestedVarFactor: boolean;
  useAdUxDlTxFactorDlt: boolean;
  useMoq: boolean;
  useAdUxFrequency: boolean;
  futureAduDays: number;
  bufferProfileId: number;
  mto: boolean;
  adi: number;
}

export type ICenterProductResponse = IResponse<ICenterProduct>;
export type ICenterProductListResponse = IResponse<ICenterProduct[]>;