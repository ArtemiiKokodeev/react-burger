import { React, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { handleGetIngredients } from '../../services/actions/ingredients';
import Home from '../../pages/home/home';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_ORDER_DETAILS } from "../../services/actions/order";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetIngredients());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
      payload: null
    });
    dispatch({
      type: CLOSE_ORDER_DETAILS
    });
  };

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e) {
    e.target === e.currentTarget && handleModalClose();
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
        <Route exact path="/profile" element={<Profile />} />
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
