import { Ingredient } from '../../../models/recipe.model'

export type CreateRecipeFormType = {
  name: string;
  defaultPortions: number,
  ingredients: Ingredient[]
};