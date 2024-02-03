import React from 'react';
import { Link } from 'react-router-dom';
import formComponentStyles from './form-component.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function FormComponent( { 
  title,
  name,
  children,
  submitButtonText,
  onSubmit,
  redirectQuestionText,
  redirectRoute,
  redirectActionText,
  redirectQuestionTextForgotPass,
  redirectRouteForgotPass,
  redirectActionTextForgotPass
}) {

  return (
    <div className={formComponentStyles.formComponent}>
      <h1 className="text text_type_main-medium">{title}</h1>
      <form name={name} className={formComponentStyles.form} onSubmit={onSubmit}>
        {children}
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" width="253px">
          {submitButtonText}
        </Button>
      </form>
      <div className={formComponentStyles.redirectContainer}>
        <p className={formComponentStyles.redirectText}>
          {redirectQuestionText}
        </p>
        <Link to={redirectRoute} className={formComponentStyles.redirectTextLink}>
          {redirectActionText}
        </Link>
      </div>
      {name === "loginForm" &&
        <div className={formComponentStyles.redirectContainer}>
          <p className={formComponentStyles.redirectText}>
            {redirectQuestionTextForgotPass}
          </p>
          <Link to={redirectRouteForgotPass} className={formComponentStyles.redirectTextLink}>
            {redirectActionTextForgotPass}
          </Link>
        </div>
      }
    </div>
  )
}

export default FormComponent;