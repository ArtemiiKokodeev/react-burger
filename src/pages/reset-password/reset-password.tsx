import React, { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as api from '../../utils/api';
import resetPasswordStyles from './reset-password.module.css';
import UserFormComponent from '../form-component/form-component';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {

  const navigate = useNavigate();

  const isForgotPasswordSuccess = localStorage.getItem("forgot-password")
  
  interface IResetPasswordFormValues { password: string; token: string; };
  const [formValue, setFormValue] = useState<IResetPasswordFormValues>({ password: '', token: '' })

  const [isShownSuccessResetPassText, setIsShownSuccessResetPassText] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleResetPassword(password: string, token: string) {
    api.resetPassword(password, token)
    .then((res) => {
      if (res && res.success) {
        setIsShownSuccessResetPassText(true);
        setTimeout(function() {
          navigate('/login', {replace: true});
          localStorage.removeItem("forgot-password");
          setIsShownSuccessResetPassText(false);
        }, 2500)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleResetPassword(formValue.password, formValue.token);
  }

  return (
    !isForgotPasswordSuccess ? <Navigate to='/' /> :
      <div className={resetPasswordStyles.form}>
        <UserFormComponent 
          title="Восстановление пароля"
          name="resetPasswordForm"
          submitButtonText="Сохранить"
          onSubmit={handleSubmit}
          redirectQuestionText="Вспомнили пароль?"
          redirectRoute="/login"
          redirectActionText="Войти"
          isShownSuccessText={isShownSuccessResetPassText}
          successText="Ваш пароль успешно изменен"
          children={(
            <>
              <PasswordInput
                name={"password"}
                placeholder={"Введите новый пароль"}
                value={formValue.password || ""}
                onChange={handleChange}
                extraClass="mt-6"
              />
              <Input
                name={"token"}
                placeholder={"Введите код из письма"}
                value={formValue.token || ""}
                onChange={handleChange}
                extraClass="mt-6"
              />
            </>
          )}
        />
      </div>
  );
}

export default ResetPassword;