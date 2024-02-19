import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../utils/api';
import forgotPasswordStyles from './forgot-password.module.css';
import UserFormComponent from '../form-component/form-component';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword(): React.JSX.Element {

  const navigate = useNavigate();

  interface IForgotPasswordFormValues { email: string;};
  const [formValue, setFormValue] = useState<IForgotPasswordFormValues>({ email: '' });

  const [isShownSuccessForgotPassText, setIsShownSuccessForgotPassText] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleForgotPassword(email: string) {
    api.forgotPassword(email)
    .then((res) => {
      if (res && res.success) {
        // @ts-ignore
        localStorage.setItem("forgot-password", true);
        setIsShownSuccessForgotPassText(true);
        setTimeout(function() {
          navigate('/reset-password', {replace: true});
          setIsShownSuccessForgotPassText(false);
        }, 2500)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleForgotPassword(formValue.email);
  }

  return (
      <div className={forgotPasswordStyles.form}>
        <UserFormComponent 
          title="Восстановление пароля"
          name="forgotPasswordForm"
          submitButtonText="Восстановить"
          onSubmit={handleSubmit}
          redirectQuestionText="Вспомнили пароль?"
          redirectRoute="/login"
          redirectActionText="Войти"
          isShownSuccessText={isShownSuccessForgotPassText}
          successText="Код подтверждения направлен на Ваш e-mail"
          children={(
            <EmailInput
              name={"email"}
              placeholder={"Укажите e-mail"}
              value={formValue.email || ""}
              onChange={handleChange}
              extraClass="mt-6"
            />   
          )}
        />
      </div>
  );
}

export default ForgotPassword;