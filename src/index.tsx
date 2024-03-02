import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from './services/store'
import { BrowserRouter } from 'react-router-dom';
import type { ThunkDispatch } from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const store = configureStore();

type TApplicationActions = any;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

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
