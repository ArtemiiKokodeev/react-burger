import React from 'react';
import { useNavigate } from 'react-router-dom';
import pageNotFoundStyles from './not-found.module.css';

function PageNotFound() {

  const navigate = useNavigate();

  return (
    <div className={pageNotFoundStyles.notFound}>
      <h3 className={pageNotFoundStyles.code}>404</h3>
      <h3 className={pageNotFoundStyles.title}>Страница не найдена</h3>
      <p onClick={() => navigate(-1)} className={pageNotFoundStyles.toMain}>Назад</p>
    </div>
  )
}

export default PageNotFound; 