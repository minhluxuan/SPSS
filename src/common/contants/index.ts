export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';
export const SPSO_REPOSITORY = 'SPSO_REPOSITORY';
export enum Role {
    SPSO = 'SPSO',
    CUSTOMER = 'CUSTOMER'
}

export enum PrintingStatus {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    PROCESSING = 'PROCESSING',
    FAILED = 'FAILED',
    SUCCESS = 'SUCCESS'
}

export enum PurchasingStatus {
    PENDING = 'PENDING',
    PAID = 'PAID', 
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    PROCESSING = 'PROCESSING',
    FAILED = 'FAILED'
}

export enum PaperOrientation {
    LANDSCAPE = 'LANDSCAPE',
    PORTRAIT = 'PORTRAIT'
}   

export enum PaperSize {
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    A3 = 'A3',
    A4 = 'A4',
    A5 = 'A5'
}