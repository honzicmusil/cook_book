import { Material } from "./material.model";

export interface Recipe {
  id: string;
  name: string;
  defaultPortions: number,
  ingredients: Ingredient[]
}

export interface Ingredient {
  material: Material,
  amount: number
}