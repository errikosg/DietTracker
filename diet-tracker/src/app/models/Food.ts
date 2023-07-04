import { Nutrients } from "./Nutrients";

export interface Food {
    foodId: string,
    label: string,
    nutrients: Nutrients,
    image?: string,
    _id? : string,
    weight?: number;
}