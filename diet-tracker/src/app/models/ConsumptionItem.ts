import { Food } from "./Food";
import { Recipe } from "./Recipe";

export interface ConsumptionItem {
    type: "recipe" | "food",
    log: Recipe | Food
}