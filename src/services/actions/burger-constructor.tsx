import { TConstructorIngredient } from "../../utils/types";
export const ADD_INGREDIENTS_TO_CONSTRUCTOR: "ADD_INGREDIENTS_TO_CONSTRUCTOR" = "ADD_INGREDIENTS_TO_CONSTRUCTOR";
export const REMOVE_INGREDIENTS_FROM_CONSTRUCTOR: "REMOVE_INGREDIENTS_FROM_CONSTRUCTOR" = "REMOVE_INGREDIENTS_FROM_CONSTRUCTOR";
export const SORT_INGREDIENTS_IN_CONSTRUCTOR: "SORT_INGREDIENTS_IN_CONSTRUCTOR" = "SORT_INGREDIENTS_IN_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export interface IAddIngredientsToConstructor {
  readonly type: typeof ADD_INGREDIENTS_TO_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
};

export interface IRemoveIngredientsFromConstructor {
  readonly type: typeof REMOVE_INGREDIENTS_FROM_CONSTRUCTOR;
  readonly payload: string;
};

interface ISortIndex {
  dragIndex: number,
  hoverIndex: number
}

export interface ISortConstructorIngredients {
  readonly type: typeof SORT_INGREDIENTS_IN_CONSTRUCTOR;
  readonly payload: ISortIndex;
};

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR
};

export type TBurgerConstructor = 
  | IAddIngredientsToConstructor
  | IRemoveIngredientsFromConstructor
  | ISortConstructorIngredients
  | IClearConstructor;