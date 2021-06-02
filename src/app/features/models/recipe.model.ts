import { Material } from "./material.model";

export interface Recipe {
	id: string;
	name: string;
	description: string;
	defaultPortions: number;
  preparationLength: number;
	materials: Ingredient[];
}

export interface Ingredient {
	material: Material;
	amount: number;
}
