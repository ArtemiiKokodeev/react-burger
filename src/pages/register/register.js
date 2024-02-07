import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import registerStyles from './register.module.css';
import UserFormComponent from '../form-component/form-component';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { handleRegistration } from '../../services/actions/register';
import { useDispatch, useSelector } from 'react-redux';

function Register() {

  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.login);
  
  const [formValue, setFormValue] = useState({
    name: '',
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
    dispatch(handleRegistration(formValue.name, formValue.email, formValue.password));
  }

  return (
    loggedIn ? <Navigate to='/' /> :
      <div className={registerStyles.form}>
        <UserFormComponent 
          title="Регистрация"
          name="registerForm"
          submitButtonText="Зарегистрироваться"
          onSubmit={handleSubmit}
          redirectQuestionText="Уже зарегистрированы?"
          redirectRoute="/login"
          redirectActionText="Войти"
          children={(
            <>
              <Input
                type={"text"}
                name={"name"}
                placeholder={"Имя"}
                value={formValue.name || ""}
                onChange={handleChange}
                extraClass="mt-6"
              />
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

export default Register;