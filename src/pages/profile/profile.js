import { React, useState } from 'react';
import profileStyles from './profile.module.css';
import { Link } from 'react-router-dom';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


function Profile( { onUpdateUserInfo } ) {

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  // const [isShownSubmitButton, setIsShownSubmitButton] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const onSubmit = (e, data) => {
    e.preventDefault();
    onUpdateUserInfo({
      name: data.name,
      email: data.email,
      password: data.password
    });
  }

  // useEffect(() => {
  //   if (formValue.name === currentUser.name && formValue.email === currentUser.email && formValue.password === currentUser.password) {
  //     setIsShownSubmitButton(false);
  //   } else {
  //     setIsShownSubmitButton(true);
  //   }
  // }, [formValue.name, formValue.email, formValue.password, currentUser])

    return (
      <div className={profileStyles.profile}>
        <div className={profileStyles.navContainer}>
          <div className={profileStyles.linksContainer}>
            <Link to="/profile" className={profileStyles.profileLinkText}>
              Профиль
            </Link>
            <Link to="/profile/orders" className={profileStyles.linkText}>
              История заказов
            </Link>
            <Link to="/login" className={profileStyles.linkText}>
              Выход
            </Link>
          </div>
          <p className={profileStyles.descriptionText}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <form name="profile" className={profileStyles.form} onSubmit={onSubmit}>
          <div className={profileStyles.inputsContainer}>
            <Input
                type={"text"}
                name={"name"}
                placeholder={"Имя"}
                value={formValue.name || "Марк"}
                onChange={handleChange}
                icon="EditIcon"
              />
              <EmailInput
                name={"email"}
                placeholder={"E-mail"}
                value={formValue.email || "mail@stellar.burgers"}
                onChange={handleChange}
                extraClass="mt-6"
                icon="EditIcon"
              />   
              <PasswordInput
                name={"password"}
                placeholder={"Пароль"}
                value={formValue.password || "12345"}
                onChange={handleChange}
                extraClass="mt-6"
              />
          </div>
          <div className={profileStyles.submitButtonsContainer}>
            <Button htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6" width="253px">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    )
};

export default Profile;