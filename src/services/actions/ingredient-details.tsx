import { TIngredient } from '../../utils/types'

export const SHOW_INGREDIENT_DETAILS: "SHOW_INGREDIENT_DETAILS" = "SHOW_INGREDIENT_DETAILS";
export const CLOSE_INGREDIENT_DETAILS: "CLOSE_INGREDIENT_DETAILS" = "CLOSE_INGREDIENT_DETAILS";

export interface IShowIngredientsDetails {
  readonly type: typeof SHOW_INGREDIENT_DETAILS;
  readonly payload: TIngredient;
};

export interface ICloseIngredientsDetails {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
};

export type TIngredientsDetailesActions = 
  | IShowIngredientsDetails
  | ICloseIngredientsDetails;
