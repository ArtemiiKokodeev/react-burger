import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import formComponentStyles from './form-component.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../components/modal/modal';
import { POST_REGISTER_CLOSE_SUCCESS_MODAL } from '../../services/actions/register';

function FormComponent( { 
  title,
  name,
  children,
  submitButtonText,
  onSubmit,
  redirectQuestionText,
  redirectRoute,
  redirectActionText,
  redirectQuestionTextForgotPass,
  redirectRouteForgotPass,
  redirectActionTextForgotPass
}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessfulRegistModal } = useSelector((state) => state.register);

  useEffect(() => {
    showSuccessfulRegistModal && 
      setTimeout(function() {
        navigate('/login', {replace: true});
        dispatch({type: POST_REGISTER_CLOSE_SUCCESS_MODAL});
      }, 2500)
  }, [showSuccessfulRegistModal, navigate, dispatch])

  const handleModalClose = () => {
    dispatch({type: POST_REGISTER_CLOSE_SUCCESS_MODAL});
  };

  function handleCloseModalWithOverlayClick(e) {
    e.target === e.currentTarget && handleModalClose();
  }

  return (
    <>
      <div className={formComponentStyles.formComponent}>
        <h1 className="text text_type_main-medium">{title}</h1>
        <form name={name} className={formComponentStyles.form} onSubmit={onSubmit}>
          {children}
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" width="253px">
            {submitButtonText}
          </Button>
        </form>
        <div className={formComponentStyles.redirectContainer}>
          <p className={formComponentStyles.redirectText}>
            {redirectQuestionText}
          </p>
          <Link to={redirectRoute} className={formComponentStyles.redirectTextLink}>
            {redirectActionText}
          </Link>
        </div>
        {name === "loginForm" &&
          <div className={formComponentStyles.redirectContainer}>
            <p className={formComponentStyles.redirectText}>
              {redirectQuestionTextForgotPass}
            </p>
            <Link to={redirectRouteForgotPass} className={formComponentStyles.redirectTextLink}>
              {redirectActionTextForgotPass}
            </Link>
          </div>
        }
      </div>

      { showSuccessfulRegistModal &&
        <Modal 
          onClose={handleModalClose} 
          onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
        >
          <h3 className={formComponentStyles.successRegistModalText}>Успешная регистрация!</h3>
        </Modal>
      }
    </>
  )
}

export default FormComponent;