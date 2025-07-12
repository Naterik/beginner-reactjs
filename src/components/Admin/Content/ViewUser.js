import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const ViewUser = props => {
  const { show, setShow, fetchUser, dataUpdate, resetData } = props;
  const { t } = useTranslation(); // Use the t function for translation

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setImage('');
    setPreviewImage('');
    resetData();
  };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage('');
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setPreviewImage('');
      }
    }
  }, [dataUpdate]);

  const handlerPreviewImage = event => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage('');
      setImage('');
    }
  };

  const handlerUpdateUser = async () => {
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchUser();
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('admin.user.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t('admin.user.table.email')}</label>
              <input type="email" className="form-control" value={email} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t('admin.user.password')}</label>
              <input type="password" className="form-control" value={password} disabled />
            </div>
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
            <div className="col-md-4">
              <label className="form-label">{t('admin.user.table.role')}</label>
              <select
                id="inputState"
                className="form-select"
                value={role}
                onChange={event => {
                  setRole(event.target.value);
                }}
              >
                <option value="USER">{t('admin.user.sub_role.user')}</option>
                <option value="ADMIN">{t('admin.user.sub_role.admin')}</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> {t('admin.user.upload_image')}
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={event => {
                  handlerPreviewImage(event);
                }}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <span>{t('admin.user.non_image')}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('admin.user.close')}
          </Button>
          <Button variant="primary" onClick={() => handlerUpdateUser()}>
            {t('admin.user.save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUser;
