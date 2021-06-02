import { Material } from "./material.model";

export interface Recipe {
	id: string;
	name: string;
	description: string;
	defaultPortions: number;
  preparationLenght: number;
	ingredients: Ingredient[];
}

export interface Ingredient {
	material: Material;
	amount: number;
}
