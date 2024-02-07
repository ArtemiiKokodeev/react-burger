import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userInfoStyles from './user-info.module.css';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import homeStyles from '../../pages/home/home.module.css';
import { handleUpdateUserInfo } from '../../services/actions/profile';

function UserInfo() {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.profile);

  const { userInfoRequest } = useSelector((state) => state.profile);
  const { ingredientsRequest } = useSelector((state) => state.ingredientsArr);

  const [isShownSubmitButton, setIsShownSubmitButton] = useState(false);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const onCancelChanges = () => {
    setFormValue({ name: userInfo.name, email: userInfo.email });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleUpdateUserInfo(formValue.name, formValue.email, formValue.password));
  }

  return (
    <>
      { ingredientsRequest || userInfoRequest ? <p className={homeStyles.loader}>Загрузка...</p> :

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
      }
    </>
  )
};

export default UserInfo;