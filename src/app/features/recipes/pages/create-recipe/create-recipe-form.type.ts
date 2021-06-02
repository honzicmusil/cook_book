import { Ingredient } from '../../../models/recipe.model'

export type CreateRecipeFormType = {
  name: string;
  description: string;
  defaultPortions: number,
  preparationLength: number,
  materials: Ingredient[]
};