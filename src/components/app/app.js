import { React, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
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
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { POST_LOGIN_SUCCESS } from "../../services/actions/login";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

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
  }, [dispatch])

  // закрытие модалки ингредиента и возвращение на роут /
  const handleModalClose = () => {
    navigate(-1);
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
      payload: null
    });
  };

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e) {
    e.target === e.currentTarget && handleModalClose();
  }

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
        <Route path="/" element={<Home />}/>
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/profile" element={<Profile />}>
          <Route exact path="/profile" element={<UserInfo />} />
          <Route exact path="/profile/orders" element={<Orders />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path="/ingredients/:ingredientId"
	          element={
	            <Modal 
                onClose={handleModalClose} 
                onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
              >
	              <IngredientDetails background={background}/>
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </div>
  );
}

export default App;
