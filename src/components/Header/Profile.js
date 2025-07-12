import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserInfo from './UserInfo';
import ModalPassword from './ModalPassword';
import ModalResult from './ModalResult';
import './Header.scss';
import { useTranslation } from 'react-i18next';
const Profile = props => {
  const { t } = useTranslation();
  const { show, setShow } = props;
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size="lg" className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Tabs defaultActiveKey="home" className="mb-3 setting ">
            <Tab eventKey="home" title={t('header.setting_modal.user_info')}>
              <UserInfo />
            </Tab>
            <Tab eventKey="profile" title={t('header.setting_modal.change_pass')}>
              <ModalPassword />
            </Tab>
            <Tab eventKey="contact" title={t('header.setting_modal.history_quiz')}>
              <ModalResult />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
