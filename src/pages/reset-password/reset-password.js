import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import UserFormComponent from '../form-component/form-component';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function ResetPassword() {

  const { loggedIn } = useSelector((state) => state.login);
  
  const [formValue, setFormValue] = useState({
    password: '',
    code: ''
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
    // onResetPassword(formValue.password, formValue.code);
  }

  return (
    loggedIn ? <Navigate to='/' /> :
      <div className={resetPasswordStyles.form}>
        <UserFormComponent 
          title="Восстановление пароля"
          name="resetPasswordForm"
          submitButtonText="Сохранить"
          onSubmit={handleSubmit}
          redirectQuestionText="Вспомнили пароль?"
          redirectRoute="/login"
          redirectActionText="Войти"
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
                name={"code"}
                placeholder={"Введите код из письма"}
                value={formValue.code || ""}
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