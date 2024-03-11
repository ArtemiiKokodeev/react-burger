import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from './services/store'
import { BrowserRouter } from 'react-router-dom';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TRegisterActions } from './services/actions/register';
import { TUserProfile } from './services/actions/profile';
import { TOrderActions } from './services/actions/order';
import { TLogin } from './services/actions/login';
import { TIngredientsActions } from './services/actions/ingredients';
import { TIngredientsDetailesActions } from './services/actions/ingredient-details';
import { TBurgerConstructor } from './services/actions/burger-constructor';
import { TFeedActions } from './services/actions/feed';
import { TUserFeedActions } from './services/actions/user-feed';
import { TOrderInfoActions } from './services/actions/order-info';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const store = configureStore();

type TApplicationActions = TRegisterActions | TUserProfile | TOrderActions | TLogin | TIngredientsActions | TIngredientsDetailesActions | TBurgerConstructor | TFeedActions | TUserFeedActions | TOrderInfoActions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
