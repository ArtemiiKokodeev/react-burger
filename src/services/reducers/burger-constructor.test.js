import { burgerConstructorReducer, initialState } from './burger-constructor';
import {
  ADD_INGREDIENTS_TO_CONSTRUCTOR,
  REMOVE_INGREDIENTS_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from '../actions/burger-constructor';

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

const id = '';

const dndIndex = {
  dragIndex: 1,
  hoverIndex: 2
}


describe('burger-constructor reducer', () => {
  it('should return the initial state', () => {
    const received = burgerConstructorReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle ADD_INGREDIENTS_TO_CONSTRUCTOR', () => {
    const received = burgerConstructorReducer(initialState, {
      type: ADD_INGREDIENTS_TO_CONSTRUCTOR,
      payload: ingredient,
    });
    const expected = {
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients, ingredient], // Add the ingredient to the array
    };
    expect(received).toEqual(expected);
  })

  it('should handle REMOVE_INGREDIENTS_FROM_CONSTRUCTOR', () => {
    const received = burgerConstructorReducer(initialState, {
      type: REMOVE_INGREDIENTS_FROM_CONSTRUCTOR,
      payload: id
    });
    const expected = {
      ...initialState,
      constructorIngredients: initialState.constructorIngredients.filter((item) => 
        item.key !== id
      ),
    };
    expect(received).toEqual(expected);
  })

  it('should handle SORT_INGREDIENTS_IN_CONSTRUCTOR', () => {
    const received = burgerConstructorReducer(initialState, {
      type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
      payload: dndIndex
    });
    const expected = {
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients] // Clone the array to avoid mutating the initial state
    };
    expected.constructorIngredients.splice(dndIndex.hoverIndex, 0, expected.constructorIngredients.splice(dndIndex.dragIndex, 1)[0]); // Manipulate the cloned array
    expect(received).toEqual(expected);
  })

  it('should handle CLEAR_CONSTRUCTOR', () => {
    const received = burgerConstructorReducer(initialState, {
      type: CLEAR_CONSTRUCTOR
    });
    const expected = {
      ...initialState,
      constructorBuns: null,
      constructorIngredients: []
    };
    expect(received).toEqual(expected);
  })

})