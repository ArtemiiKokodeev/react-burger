import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";

const reducer = combineReducers({
    ingredientsArr: ingredientsReducer,
    ingredientsDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer
});

export default reducer;