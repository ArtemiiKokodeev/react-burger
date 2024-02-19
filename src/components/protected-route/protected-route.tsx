import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import homeStyles from '../../pages/home/home.module.css';
import { useAppSelector } from '../../index';

interface ProtectedRouteElementProps {
  onlyUnAuth?: boolean,
  component: React.ComponentType
}; 

const ProtectedRouteElement = (
  { onlyUnAuth = false, component: Component, ...props }: ProtectedRouteElementProps) => {

  const { loggedIn } = useAppSelector((state) => state.login);
  const { isAuthChecked } = useAppSelector((state) => state.profile);
  const location = useLocation();

  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <p className={homeStyles.loader}>Загрузка...</p>;
  }

  if (onlyUnAuth && loggedIn) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  } 
  
  if (!onlyUnAuth && !loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && loggedIn Пользователь авторизован и роут для авторизованного пользователя
  // либо onlyUnAuth && !loggedIn Пользователь не авторизован и роут для неавторизованного пользователя

  return <Component {...props} />
}

export const OnlyAuth = ProtectedRouteElement;

type TOnlyUnAuthProps = { component: React.ComponentType }
export const OnlyUnAuth = ({ component }: TOnlyUnAuthProps) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);