import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userInfoReducer } from "./profile";
import { wsReducer } from "./ws-reducer";
import { orderInfoReducer } from "./order-info";

const reducer = combineReducers({
    ingredientsArr: ingredientsReducer,
    ingredientsDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    register: registerReducer,
    login: loginReducer,
    profile: userInfoReducer,
    feed: wsReducer,
    orderInfo: orderInfoReducer
});

export default reducer;