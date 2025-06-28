import { IResponse } from "./IResponse";

export interface IOutbound {
  id: number;
  type: number;
  orderNumber: string;
  isInbound: false;
  isOutbound: true;
  creationDate: string;
  deliveryDate: string;
  productId: number;
  productCode: string;
  productDescription: string;
  destinyCenterId: number;
  destinyCenterCode: string;
  destinyCenterDescription: string;
  quantity: number;
  deliveredQuantity: number;
  measurementUnit: string;
  position: number;
  notes: string;
  supplierCode: string | null;
  supplierName: string | null;
  clientCode: string | null;
  clientName: string | null;
  completionDate: string | null;
  purchaseCreationDate: string | null;
  status: number;
}


export type IOutboundsResponse = IResponse<IOutbound>;
export type IOutboundsListResponse = IResponse<IOutbound[]>;