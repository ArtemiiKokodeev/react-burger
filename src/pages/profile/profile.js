import { React } from 'react';
import profileStyles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../services/actions/profile';
import { POST_LOGOUT } from "../../services/actions/login";

function Profile() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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