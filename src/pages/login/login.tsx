import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import UserFormComponent from '../form-component/form-component';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { handleLogin } from '../../services/actions/login';
import { useAppSelector, useAppDispatch } from '../../index';

function Login(): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state.login);

  interface ILoginFormValues {
    email: string;
    password: string;
  };
  
  const [formValue, setFormValue] = useState<ILoginFormValues>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(handleLogin(formValue.email, formValue.password));
  };

  useEffect(() => {
    loggedIn && navigate('/', {replace: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
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