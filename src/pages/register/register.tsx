import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import registerStyles from './register.module.css';
import UserFormComponent from '../form-component/form-component';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { handleRegistration } from '../../services/actions/register';
import { POST_REGISTER_CLOSE_SUCCESS_TEXT } from "../../services/actions/register";
import { useAppSelector, useAppDispatch } from '../../index';

function Register(): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { registerSuccessText } = useAppSelector((state) => state.register);

  const [isShownSuccessRegistText, setIsShownSuccessRegistText] = useState<boolean>(false);
  
  interface IRegisterFormValues {
    name: string;
    email: string;
    password: string;
  };

  const [formValue, setFormValue] = useState<IRegisterFormValues>({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(handleRegistration(formValue.name, formValue.email, formValue.password));
  }

  useEffect(() => {
    if (registerSuccessText) {
      setIsShownSuccessRegistText(true);
      setTimeout(function() {
        navigate('/login', {replace: true});
        setIsShownSuccessRegistText(false);
        dispatch({type: POST_REGISTER_CLOSE_SUCCESS_TEXT});
      }, 2500)
    } 
  }, [registerSuccessText, dispatch, navigate])

  return (
      <div className={registerStyles.form}>
        <UserFormComponent 
          title="Регистрация"
          name="registerForm"
          submitButtonText="Зарегистрироваться"
          onSubmit={handleSubmit}
          redirectQuestionText="Уже зарегистрированы?"
          redirectRoute="/login"
          redirectActionText="Войти"
          isShownSuccessText={isShownSuccessRegistText}
          successText="Успешная регистрация!"
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