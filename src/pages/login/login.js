import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import UserFormComponent from '../form-component/form-component';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Login( { onRegister, loggedIn } ) {
  
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    // onLogin(formValue.email, formValue.password);
  }

  return (
    loggedIn ? <Navigate to='/' /> :
      <div className={loginStyles.form}>
        <UserFormComponent 
          title="Вход"
          name="loginForm"
          submitButtonText="Войти"
          onSubmit={handleSubmit}
          redirectQuestionText="Вы - новый пользователь?"
          redirectRoute="/register"
          redirectActionText="Зарегистрироваться"
          redirectQuestionTextForgotPass="Забыли пароль?"
          redirectRouteForgotPass="/forgot-password"
          redirectActionTextForgotPass="Восстановить пароль"
          children={(
            <>
              <EmailInput
                name={"email"}
                placeholder={"E-mail"}
                value={formValue.email || ""}
                onChange={handleChange}
                extraClass="mt-6"
              />   
              <PasswordInput
                name={"password"}
                placeholder={"Пароль"}
                value={formValue.password || ""}
                onChange={handleChange}
                extraClass="mt-6"
              />
            </>
          )}
        />
      </div>
  );
}

export default Login;