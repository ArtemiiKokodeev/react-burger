import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <a href="/" className={`${appHeaderStyles.headerItem} pl-5 pr-5 pb-4 pt-4`}>
          <BurgerIcon type="primary" />
          <p className={`${appHeaderStyles.title} text text_type_main-default ml-2`}>
            Конструктор
          </p>
        </a>
        <a href="/" className={`${appHeaderStyles.headerItem} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type="secondary" />
          <p className={`${appHeaderStyles.title} text text_type_main-default text_color_inactive ml-2`}>
            Лента заказов
          </p>
        </a>
      </nav>
      <a href="/" className={appHeaderStyles.logo}>
        <Logo />
      </a>
      <a href="/" className={`${appHeaderStyles.headerItem} pl-5 pr-5 pb-4 pt-4`}>
        <ProfileIcon type="secondary" />
          <p className={`${appHeaderStyles.title} text text_type_main-default text_color_inactive ml-2`}>
          Личный кабинет
          </p>
      </a>
    </header>
  );
}

export default AppHeader;