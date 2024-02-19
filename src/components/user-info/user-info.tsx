import React, { FormEvent, useState, useEffect } from 'react';
import userInfoStyles from './user-info.module.css';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { handleUpdateUserInfo } from '../../services/actions/profile';
import { useAppSelector, useAppDispatch } from '../../index';
import { IUserInfoFormValues } from '../../utils/types'

function UserInfo() {

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.profile);

  const [isShownSubmitButton, setIsShownSubmitButton] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<IUserInfoFormValues>(
    { name: '', email: '', password: '' })

  useEffect(() => {
    userInfo && setFormValue({ name: userInfo.name, email: userInfo.email })
  }, [userInfo])

  useEffect(() => {
    if (userInfo && formValue.name === userInfo.name && formValue.email === userInfo.email && !formValue.password) {
      setIsShownSubmitButton(false);
    } else {
      setIsShownSubmitButton(true);
    }
  }, [formValue.name, formValue.email, formValue.password, userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onCancelChanges = () => {
    setFormValue({ name: userInfo.name, email: userInfo.email, password: '' });
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(handleUpdateUserInfo(formValue));
  }

  return (
    <form name="profile" className={userInfoStyles.form} onSubmit={onSubmit}>
      <div className={userInfoStyles.inputsContainer}>
        <Input
            type={"text"}
            name={"name"}
            placeholder={"Имя"}
            value={formValue.name || ""}
            onChange={handleChange}
            icon="EditIcon"
          />
          <EmailInput
            name={"email"}
            placeholder={"E-mail"}
            value={formValue.email || ""}
            onChange={handleChange}
            extraClass="mt-6"
            // @ts-ignore
            icon="EditIcon"
          />   
          <PasswordInput
            name={"password"}
            placeholder={"Пароль"}
            value={formValue.password || ""}
            onChange={handleChange}
            extraClass="mt-6"
          />
      </div>
      {
        isShownSubmitButton && 
          <div className={userInfoStyles.submitButtonsContainer}>
            <Button onClick={() => onCancelChanges()} htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6" width="253px">
              Сохранить
            </Button>
          </div>
        }
      </form>
  )
};

export default UserInfo;