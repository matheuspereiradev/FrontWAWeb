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
    centerDescription: string;
    measurementUnit: string;
    bufferProfile: string;
    usesMinMax: boolean;
    coverageDays: number;
    netFlow: number;
    orderToMake: number;
    optimizedQuantity: number; 
    netFlowBuffer: number;
    aduDays: number;
    futureAduDays: number;
    
    // coefficientOfVariation: number; // new
    // reserved: number; // new
    // stockInTransit: number; // new
    suggestedOrderQuantity: number; // new
    approved: boolean; // new
    
    executionBuffer: number; // new
    executionBufferColor: string; // new
    simulatedNetFlowBuffer: number; // new
    projectedShortage: number; // new
    outOfStockWithDemand: boolean; // new
    consumptionPeak: boolean; // new
    topOfRed: number; // new
    topOfYellow: number; // new
    topOfGreen: number; // new
    topOfRedExecution: number; // new
    topOfYellowExecution: number; // new
    topOfGreenExecution: number; // new
    projectedAverageInventory: number; // new
    lastCost: number; // new
    factorLT: string; // new
    factorCV: string; // new
    leadTimeFactor: number; // new
    variabilityFactor: number; // new
    productClass: string; // new
    reason: string; // new
    bufferType: string; // new
    lastUpdate: string | null; // new (pode ser Date se preferir)
    notes: string; // new
    currency: string; 
}

export type IDashboardResponse = IResponse<IDashboard>;
export type IDashboardListResponse = IResponse<IDashboard[]>;
