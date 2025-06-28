import { IResponse } from "./IResponse";

export interface IInbound {
  id: number;
  type: number;
  orderNumber: string;
  isInbound: boolean;
  isOutbound: boolean;
  creationDate: string;
  deliveryDate: string;
  productId: number;
  productCode: string;
  productDescription: string;
  originCenterId: number;
  originCenterCode: string;
  originCenterDescription: string;
  quantity: number;
  deliveredQuantity: number;
  measurementUnit: string;
  position: number;
  notes: string;
  supplierCode: string;
  supplierName: string;
  clientCode: string | null;
  clientName: string | null;
  completionDate: string | null;
  purchaseCreationDate: string | null;
  status: number;
}


export type IInboundResponse = IResponse<IInbound>;
export type IInboundListResponse = IResponse<IInbound[]>;