import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from 'react-icons/im';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!password) {
      toast.error('Invalid password');
      return;
    }
    setIsLoading(true);
    let data = await loginUser(email, password);
    if (data && data.EC === 0) {
      dispatch(userLogin(data));
      toast.success('Login success');
      setIsLoading(false);
      navigate('/');
    } else {
      toast.error(` ${data.EM}`);
    }
  };
  const handleSubmit = event => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  return (
    <div className="login-content">
      <div className="header d-flex justify-content-end align-items-center">
        <Language />
        <div className="ms-3 d-flex align-items-center">
          <span>{t('auth.login.have_question')}</span>
          <button className="ms-2 btn-signup" onClick={() => navigate('/register')}>
            {t('auth.login.sign_up')}
          </button>
        </div>
      </div>

      <div className="welcome">{t('auth.login.welcome')}</div>
      <div className="title">{t('auth.login.get_better_data')}</div>

      <div className="content-form">
        <div className="input-form">
          <label className="form-label">{t('auth.login.email_label')}</label>
          <input className="form-control" type="text" value={email} onChange={handleEmail} />
        </div>

        <div className="input-form">
          <label className="form-label">{t('auth.login.password_label')}</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={handlePassword}
            onKeyDown={handleSubmit}
          />
        </div>

        <span className="forget-password">{t('auth.login.forget_password')}</span>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading && <ImSpinner9 className="icon-spinner" />}
          {t('auth.login.login_button')}
        </button>

        <span className="text-center go-back" onClick={() => navigate('/')}>
          {t('auth.login.go_back')}
        </span>
      </div>
    </div>
  );
};

export default Login;
