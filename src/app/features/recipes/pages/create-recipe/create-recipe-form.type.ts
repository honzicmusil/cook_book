import { Ingredient } from '../../../models/recipe.model'

export type CreateRecipeFormType = {
  name: string;
  description: string;
  defaultPortions: number,
  preparationLenght: number,
  ingredients: Ingredient[]
};