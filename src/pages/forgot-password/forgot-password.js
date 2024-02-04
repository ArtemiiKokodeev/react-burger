import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css';
import UserFormComponent from '../form-component/form-component';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function ForgotPassword() {

  const { loggedIn } = useSelector((state) => state.login);
  
  const [formValue, setFormValue] = useState({
    email: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // onForgotPassword(formValue.email);
  }

  return (
    loggedIn ? <Navigate to='/' /> :
      <div className={forgotPasswordStyles.form}>
        <UserFormComponent 
          title="Восстановление пароля"
          name="forgotPasswordForm"
          submitButtonText="Восстановить"
          onSubmit={handleSubmit}
          redirectQuestionText="Вспомнили пароль?"
          redirectRoute="/login"
          redirectActionText="Войти"
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