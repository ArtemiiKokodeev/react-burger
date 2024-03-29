import React, { useEffect } from 'react';
import profileStyles from './profile.module.css';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../services/actions/profile';
import { POST_LOGOUT } from "../../services/actions/login";
import { useAppDispatch } from '../../index';
import { USER_FEED_CONNECTION_START, USER_FEED_CONNECTION_CLOSED } from '../../services/actions/user-feed';

function Profile() {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

  // запрос массива заказов
  useEffect(() => {
    dispatch({ 
      type: USER_FEED_CONNECTION_START, 
      payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`
    });
    // console.log(accessToken);
    return () => {
      dispatch({ type: USER_FEED_CONNECTION_CLOSED });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onLogout = () => {
    dispatch(handleLogout());
    dispatch({ type: POST_LOGOUT });
    localStorage.clear();
    navigate('/login', {replace: true});
  }

  return (
    <div className={profileStyles.profile}>
      <div className={profileStyles.navContainer}>
        <div className={profileStyles.linksContainer}>
          <NavLink to="/profile" className={location.pathname === "/profile" ? profileStyles.linkTextActive : profileStyles.linkText}>
            Профиль
          </NavLink>
          <NavLink end to="/profile/orders" className={({isActive}) => isActive ? profileStyles.linkTextActive : profileStyles.linkText}>
            История заказов
          </NavLink>
          <button onClick={onLogout} className={profileStyles.logoutButton}>
            Выход
          </button>
        </div>
        <p className={profileStyles.descriptionText}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      
      <Outlet />
    </div>
  )
};

export default Profile;