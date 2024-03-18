import { ingredientDetailsReducer, initialState } from './ingredient-details';
import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const ingredient = {
  _id: "",
  name: "",
  type: "",
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: "",
  image_mobile: "",
  image_large: "",
  __v: 1
};

describe('ingredient-details reducer', () => {
  it('should return the initial state', () => {
    const received = ingredientDetailsReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle SHOW_INGREDIENT_DETAILS', () => {
    const received = ingredientDetailsReducer(initialState, {
      type: SHOW_INGREDIENT_DETAILS,
      payload: ingredient
    });
    const expected = {
      ...initialState,
      openedIngredient: ingredient
    };
    expect(received).toEqual(expected);
  })

  it('should handle CLOSE_INGREDIENT_DETAILS', () => {
    const received = ingredientDetailsReducer(initialState, {
      type: CLOSE_INGREDIENT_DETAILS,
      
    });
    const expected = {
      ...initialState,
      openedIngredient: null
    };
    expect(received).toEqual(expected);
  })

})