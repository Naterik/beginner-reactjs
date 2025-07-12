import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdateProfile } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { userUpdate } from '../../redux/action/userAction';

const UserInfo = props => {
  const data = useSelector(state => state.user.account);
  const { setShow, resetData } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      setEmail(data.email);
      setUsername(data.username);
      setRole(data.role);
      setImage('');
      if (data.image) {
        setPreviewImage(`data:image/jpeg;base64,${data.image}`);
      } else {
        setPreviewImage('');
      }
    }
  }, [data]);

  const handlerPreviewImage = event => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage('');
      setImage('');
    }
  };

  const handleUpdateProfile = async e => {
    e.preventDefault();
    console.log('image:', image);
    const res = await postUpdateProfile(username, image);
    console.log('res', res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(userUpdate(res));
      console.log(dispatch(userUpdate(res)));
      // navigate('/');
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <form className="row g-3 user-info">
        <div className="col-md-6">
          <label className="form-label">{t('admin.user.table.username')}</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="col-md-6 ">
          <label className="form-label">{t('admin.user.table.email')}</label>
          <input type="email" className="form-control" value={data.email} disabled />
        </div>
        <div className="col-md-6">
          <label className="form-label">{t('admin.user.password')}</label>
          <input type="password" className="form-control" value={data.password} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">{t('admin.user.table.role')}</label>
          <select id="inputState" className="form-select" disabled value={data.role}>
            <option value="USER">{t('admin.user.sub_role.user')}</option>
            <option value="ADMIN">{t('admin.user.sub_role.admin')}</option>
          </select>
        </div>
      </form>
      <button
        className="btn btn-warning col-2 text-center mt-3"
        onClick={e => handleUpdateProfile(e)}
      >
        Update
      </button>
    </>
  );
};

export default UserInfo;
