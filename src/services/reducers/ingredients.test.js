import { ingredientsReducer, initialState } from './ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const ingredientsExamples = [
  {
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
  },
  {
    _id: "",
    name: "",
    type: "",
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 2,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 2
  }
];

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    const received = ingredientsReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_INGREDIENTS', () => {
    const received = ingredientsReducer(initialState, {
      type: GET_INGREDIENTS
    });
    const expected = {
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const received = ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_SUCCESS,
      payload: ingredientsExamples
    });
    const expected = {
      ...initialState,
      ingredients: ingredientsExamples, 
      ingredientsRequest: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const received = ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_FAILED
    });
    const expected = {
      ...initialState,
      ingredientsFailed: true, 
      ingredientsRequest: false
    };
    expect(received).toEqual(expected);
  })

})