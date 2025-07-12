import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { postChangePassword } from '../../services/apiService';
import { RiEyeLine } from 'react-icons/ri';
import { RiEyeOffLine } from 'react-icons/ri';
import _ from 'lodash';
const ModalPassword = props => {
  const { setShow } = props;
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    show: {
      old: false,
      new: false,
      confirm: false,
    },
  });

  const handleFormState = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  const handleToggleShow = (field, value) => {
    setFormState(prev => ({
      ...prev,
      show: {
        ...prev.show,
        [field]: !prev.show[field],
      },
    }));
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = formState;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Invalid password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Not match password!!');
      return;
    }

    const res = await postChangePassword(oldPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setFormState(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <form className="row g-3 change-password">
        <div className="col-md-6">
          <label className="form-label ">{t('header.old_password')}</label>
          <div className="password-input-wrapper">
            <input
              type={formState.show.old ? 'text' : 'password'}
              className="form-control "
              onChange={event => {
                handleFormState('oldPassword', event.target.value);
              }}
            />
            {formState.oldPassword && (
              <span className="icon" onClick={() => handleToggleShow('old')}>
                {formState.show.old ? <RiEyeOffLine /> : <RiEyeLine />}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label ">{t('header.new_password')}</label>
          <div className="password-input-wrapper">
            <input
              type={formState.show.new ? 'text' : 'password'}
              className="form-control "
              onChange={event => {
                handleFormState('newPassword', event.target.value);
              }}
            />

            {formState.newPassword && (
              <span className="icon" onClick={() => handleToggleShow('new')}>
                {formState.show.new ? <RiEyeOffLine /> : <RiEyeLine />}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label ">{t('header.confirm_password')}</label>
          <div className="password-input-wrapper">
            <input
              type={formState.show.confirm ? 'text' : 'password'}
              className="form-control "
              onChange={event => {
                handleFormState('confirmPassword', event.target.value);
              }}
            />
            {formState.confirmPassword && (
              <span className="icon" onClick={() => handleToggleShow('confirm')}>
                {formState.show.confirm ? <RiEyeOffLine /> : <RiEyeLine />}
              </span>
            )}
          </div>
        </div>
      </form>
      <button
        className="btn btn-warning col-2 mt-2 "
        onClick={() => {
          handleChangePassword();
        }}
      >
        Update
      </button>
    </>
  );
};

export default ModalPassword;
