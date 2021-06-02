import { Ingredient } from '../../../models/recipe.model'

export type EditRecipeFormType = {
  name: string;
  defaultPortions: number,
  ingredients: Ingredient[]
};