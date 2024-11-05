import { Document } from "./document.entity"

export const documentProviders = [
    { provide: 'DOCUMENT_REPOSITORY', useValue: Document }
]