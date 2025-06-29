export interface IResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string;
    timestamp?: string;
}