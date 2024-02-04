import { React } from 'react';
import profileStyles from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function Profile() {

  const location = useLocation();

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
          <NavLink to="/login" className={({isActive}) => isActive ? profileStyles.linkTextActive : profileStyles.linkText}>
            Выход
          </NavLink>
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