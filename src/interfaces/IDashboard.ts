import { IResponse } from "./IResponse";

export interface IDashboard {
    centerId: number;
    centerCode: string;
    productId: number;
    productReference: string;
    productDescription: string;
    centerProductId: number;
    stock: number;
    bufferProfileId: number;
    minimumOrderQuantity: number;
    leadTime: number;
    packageQuantity: number;
    adu: number;
    futureAdu: number;
    standardDeviation: number;
    frequency: number;
    variabilityCoefficient: number;
    redBufferBase: number;
    redBufferSafety: number;
    yellowBuffer: number;
    greenBuffer: number;
    qualifiedSpike: number;
    adi: number;
    totalInbounds: number;
    totalOutbounds: number;
}

export type IDashboardResponse = IResponse<IDashboard>;
export type IDashboardListResponse = IResponse<IDashboard[]>;
