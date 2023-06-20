import { Measure } from "./Measure";
import { Nutrients } from "./Nutrients";

export interface Food {
    foodId: string,
    label: string,
    nutrients: Nutrients,
    image?: string,
    measures: Measure[]
}