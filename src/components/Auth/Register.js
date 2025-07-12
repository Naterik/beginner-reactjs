import React, { useState } from 'react';
import { MdQuiz } from 'react-icons/md';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine } from 'react-icons/ri';
import { RiEyeOffLine } from 'react-icons/ri';
import { registerUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Language from '../Header/Language';

const Register = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
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
  const handleSignUp = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!password) {
      toast.error('Invalid password');
      return;
    }

    let data = await registerUser(username, email, password);
    if (data && data.EC === 0) {
      toast.success(`${data.EM}`);
      navigate('/');
    } else {
      toast.error(`${data.EM}`);
    }
  };
  const handleSubmit = event => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };
  return (
    <div className="register-container">
      <div className="header d-flex justify-content-end align-items-center">
        <Language />
        <div className="ms-3 d-flex align-items-center">
          <span>{t('auth.register.already_have')}</span>
          <button className="ms-2 btn-login" onClick={() => navigate('/login')}>
            {t('auth.register.login')}
          </button>
        </div>
      </div>

      <div className="welcome">
        <MdQuiz /> {t('auth.register.welcome')}
      </div>
      <div className="title">{t('auth.register.get_better_data')}</div>

      <div className="register-content">
        <div className="register-form">
          <label className="form-label">{t('auth.register.username_label')}</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div className="register-form">
          <label className="form-label">{t('auth.register.email_label')}</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="register-form">
          <label className="form-label">{t('auth.register.password_label')}</label>
          <input
            className="form-control"
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            onKeyDown={event => handleSubmit(event)}
          />
          <span
            style={password ? { display: 'block' } : { display: 'none' }}
            onClick={() => setIsVisible(!isVisible)}
          >
            {!isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </span>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
          {t('auth.register.sign_up_button')}
        </button>
        <span className="text-center go-back" onClick={() => navigate('/')}>
          {t('auth.register.go_back')}
        </span>
      </div>
    </div>
  );
};

export default Register;
