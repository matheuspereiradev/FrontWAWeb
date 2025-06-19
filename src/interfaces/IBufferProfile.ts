import { IResponse } from "./IResponse";

export interface IBufferProfile {
    profileName: string;
    supplyType: number;
    leadTimeCategory: number;
    variabilityCategory: number;
    leadTimeFactor: number;
    variabilityFactor: number;
    aduCalculationDays: number;
    aduFutureDays: number;
    frequency: number;
    useAdUxDlTxFactorDlt: boolean;
    useMoq: boolean;
    useAdUxFrequency: boolean;
    spikeHorizonType: number;
    spikeHorizonValue: number;
    spikeThresholdType: number;
    spikeThreshold: number;
    spikeHorizonDays: number;
    isActive: boolean;
    id: number;
    createdAt: string;
}
export type IBufferProfileResponse = IResponse<IBufferProfile>;
export type IBufferProfileListResponse = IResponse<IBufferProfile[]>;