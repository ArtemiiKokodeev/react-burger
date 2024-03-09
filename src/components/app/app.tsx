import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { handleGetIngredients } from '../../services/actions/ingredients';
import { handleGetUserInfo } from '../../services/actions/profile';
import Home from '../../pages/home/home';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import UserInfo from '../user-info/user-info';
import Orders from '../orders/orders';
import PageNotFound from '../not-found/not-found';
import OrderFeed from '../../pages/order-feed/order-feed';
import OrderInfo from '../order-info/order-info';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_ORDER_INFO } from "../../services/actions/order-info";
import { POST_LOGIN_SUCCESS } from "../../services/actions/login";
import { useAppSelector, useAppDispatch } from '../../index';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const { loggedIn } = useAppSelector((state) => state.login);

  // запрос массива ингредиентов
  useEffect(() => {
    dispatch(handleGetIngredients());
  }, [dispatch]);

  // проверка авторизации пользователя
  useEffect(() => {
    dispatch(handleAccessTokenCheck);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

  // запрос данных текущего пользователя
  useEffect(() => {
    dispatch(handleGetUserInfo());
  }, [dispatch, loggedIn])

  // закрытие модалки ингредиента и возвращение на роут /
  const handleModalClose = () => {
    navigate(-1);
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
      payload: null
    });
    dispatch({
      type: CLOSE_ORDER_INFO,
      payload: null
    });
  };

  // проверка токена при обновлении страницы
  function handleAccessTokenCheck() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch({
        type: POST_LOGIN_SUCCESS
      });
    }
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {/* <h1>{JSON.stringify(location)}</h1>
      <h1>{JSON.stringify(location.pathname)}</h1> */}
      <Routes location={background || location}>
        <Route index element={<Home />}/>
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route path="/feed" element={<OrderFeed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/register" element={<OnlyUnAuth component={Register} />} />
        <Route path="/login" element={<OnlyUnAuth component={Login} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={ForgotPassword} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={ResetPassword} />} />
        <Route path="/profile" element={<OnlyAuth component={Profile}/>}>
          <Route path="/profile" element={<UserInfo />} />
          <Route path="/profile/orders" element={<Orders />} />
          {/* <Route path="/profile/orders/:number" element={<OrderInfo />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path="/ingredients/:ingredientId"
	          element={
	            <Modal 
                onClose={handleModalClose} 
              >
	              <IngredientDetails background={background}/>
	            </Modal>
	          }
	        />
          <Route
	          path="/feed/:number"
	          element={
	            <Modal 
                onClose={handleModalClose} 
              >
	              <OrderInfo background={background}/>
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </div>
  );
}

export default App;
