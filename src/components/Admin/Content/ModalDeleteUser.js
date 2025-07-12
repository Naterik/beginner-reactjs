import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';
import { useTranslation } from 'react-i18next';
const ModalDeleteUser = props => {
  const { show, setShow, dataUpdate, fetchUser, currentPage, setCurrentPage } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteUser = async () => {
    let data = await deleteUser(dataUpdate.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await fetchUser(1);
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('admin.user.modal_delete.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('admin.user.modal_delete.description')}{' '}
          <b>{dataUpdate && dataUpdate.email ? dataUpdate.email : dataUpdate}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('admin.user.modal_delete.close')}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteUser();
            }}
          >
            {t('admin.user.modal_delete.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
