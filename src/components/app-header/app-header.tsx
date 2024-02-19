import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from '../../index';

function AppHeader(): React.JSX.Element {

  const { loggedIn } = useAppSelector((state) => state.login);

  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <NavLink to="/" className={appHeaderStyles.headerItem}>
          {({isActive}) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"}/>
              <p className={`${isActive ? appHeaderStyles.titleActive : appHeaderStyles.title} text text_type_main-default ml-2`}>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink to="/orders" className={`${appHeaderStyles.headerItem}`}>
          {({isActive}) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"}/>
              <p className={`${isActive ? appHeaderStyles.titleActive : appHeaderStyles.title} text text_type_main-default ml-2`}>
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </nav>
      <Link to="/" className={appHeaderStyles.logo}>
        <Logo />
      </Link>
      <NavLink to={loggedIn ? "/profile" : "/login"} className={`${appHeaderStyles.headerItem}`}>
        {({isActive}) => (
          <>
            <ProfileIcon type={isActive ? "primary" : "secondary"}/>
            <p className={`${isActive ? appHeaderStyles.titleActive : appHeaderStyles.title} text text_type_main-default ml-2`}>
              Личный кабинет
            </p>
          </>
        )}
      </NavLink>
    </header>
  );
}

export default AppHeader;