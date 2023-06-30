import { Food } from "./Food";
import { Nutrients } from "./Nutrients";

export interface Recipe {
    name: string,
    ingredients: Food[],
    nutrients: Nutrients,   //sum of all ingr's nut
    _id? : string
}