import { Ingredient } from '../../../models/recipe.model'

export type EditRecipeFormType = {
  name: string;
  description: string;
  preparationLength: number;
  defaultPortions: number,
  materials: Ingredient[]
};