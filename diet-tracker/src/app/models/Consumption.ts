import { Recipe } from "./Recipe";
import { Food } from "./Food";
import { MacroGoals } from "./MacroGoals";

export interface Consumptions {
    date: Date,
    foodLogs: Food[],
    recipeLogs: Recipe[],
    totalMacros: MacroGoals,
    _id?: string;
}