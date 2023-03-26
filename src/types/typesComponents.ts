import { ApiData } from "./favoriteTypes";

 
export type valueType = {
    [K in any]: number;
}
export interface ModalProps {
    onClose: () => void;
    isOpen?: boolean
    currentId?: string;
}
export type AboutCountryType = {
    targetStyles: string,
    targetElement: ApiData;
}
export type PaginationType = {
    filtered: ApiData[],
}
