import { IResponse } from "./IResponse";

export interface IHistory {
  id: number;
  date: string;
  centerId: number;
  productId: number;
  consumption: number;
  stock: number;
  stockInTransit: number;
  inbounds: number;
  outbounds: number;
  adu: number;
  bufferDdmrpRedBase: number;
  bufferDdmrpRedSafety: number;
  bufferDdmrpYellow: number;
  bufferDdmrpGreen: number;
  profile: string;
  checkUseSuggestedLtFactor: boolean;
  checkUseSuggestedVarFactor: boolean;
  useAdUxDlTxFactorDlt: boolean;
  useMoq: boolean;
  useAdUxFrequency: boolean;
  productReference: string;
  productDescription: string;
  centerCode: string;
}


export type IHistoryResponse = IResponse<IHistory>;
export type IHistoryListResponse = IResponse<IHistory[]>;