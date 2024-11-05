export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const APP_FILTER = 'APP_FILTER';
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';
export const SPSO_REPOSITORY = 'SPSO_REPOSITORY';
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
export const DOCUMENT_REPOSITORY = 'DOCUMENT_REPOSITORY';
export const PRINTER_LOCATION_REPOSITORY = 'PRINTER_LOCATION_REPOSITORY';
export const PRINTER_REPOSITORY = 'PRINTER_REPOSITORY';
export const PURCHASING_PAGES_ORDER_REPOSITORY = 'PURCHASING_PAGES_ORDER_REPOSITORY';
export const CUSTOMER_FEEDBACK_REPOSITORY = 'CUSTOMER_FEEDBACK_REPOSITORY';
export const SPSO_FEEDBACK_REPOSITORY = 'SPSO_FEEDBACK_REPOSITORY';
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