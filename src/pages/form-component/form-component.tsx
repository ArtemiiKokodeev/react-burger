import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import formComponentStyles from './form-component.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TFormComponentProps = {
  title: string,
  name: string,
  submitButtonText: string,
  onSubmit: (e: React.FormEvent) => void,
  redirectQuestionText: string,
  redirectRoute: string,
  redirectActionText: string,
  redirectQuestionTextForgotPass?: string,
  redirectRouteForgotPass?: string,
  redirectActionTextForgotPass?: string,
  isShownSuccessText?: boolean,
  successText?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormComponent: FC<TFormComponentProps> = ( { 
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
  redirectActionTextForgotPass,
  isShownSuccessText,
  successText
}) => {

  return (
    <>
      <div className={formComponentStyles.formComponent}>
        <h1 className="text text_type_main-medium">{title}</h1>
        <form name={name} className={formComponentStyles.form} onSubmit={onSubmit}>
          {children}
          <Button htmlType="submit" type="primary" size="medium" 
            extraClass={`mt-6 ${isShownSuccessText ? "mb-5" : "mb-20"}`} width="253px"
            disabled={isShownSuccessText}
          >
            {submitButtonText}
          </Button>
        </form>

        {isShownSuccessText && 
          <p className={formComponentStyles.successText}>
            {successText}
          </p>
        }

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
            <Link to={redirectRouteForgotPass || ''} className={formComponentStyles.redirectTextLink}>
              {redirectActionTextForgotPass}
            </Link>
          </div>
        }
      </div>
    </>
  )
}

export default FormComponent;