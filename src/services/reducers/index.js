import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";

const reducer = combineReducers({
    ingredientsArr: ingredientsReducer,
    ingredientsDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer
});

export default reducer;