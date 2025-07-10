import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { putQuiz } from '../../../services/apiService';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalUpdateQuiz = props => {
  const { show, fetchGetAllQuiz, setShow, dataUpdate, setDataUpdate } = props;
  const { t } = useTranslation();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  const [imagePreview, setImagePreview] = useState('');

  const handleClose = () => {
    setImage('');
    setName('');
    setDescription('');
    setDifficulty('EASY');
    setImagePreview('');
    setShow(false);
    setDataUpdate({});
  };

  const handleImagePreview = event => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setImagePreview('');
      setImage('');
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setDifficulty(dataUpdate.difficulty);
      setImage('');
      if (dataUpdate.image) {
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setImagePreview('');
      }
    }
  }, [dataUpdate]);

  const fetchPutQuiz = async () => {
    let res = await putQuiz(dataUpdate.id, name, description, difficulty, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchGetAllQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal size="xl" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('admin.quiz.manage.modal_update.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t('admin.quiz.manage.modal_update.name')}</label>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={event => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t('admin.quiz.manage.modal_update.difficulty')}</label>
              <select
                value={difficulty}
                onChange={event => {
                  setDifficulty(event.target.value);
                }}
                className="form-select"
              >
                <option value="EASY">{t('admin.quiz.manage.form.quiz_difficulty.easy')}</option>
                <option value="MEDIUM">{t('admin.quiz.manage.form.quiz_difficulty.medium')}</option>
                <option value="HARD">{t('admin.quiz.manage.form.quiz_difficulty.hard')}</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">
                {t('admin.quiz.manage.modal_update.description')}
              </label>
              <input
                type="text"
                value={description}
                className="form-control"
                onChange={event => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="formFile" className="form-label label-upload">
                <FcPlus size={20} />
                {t('admin.quiz.manage.modal_update.upload_image')}
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                hidden
                onChange={event => {
                  handleImagePreview(event);
                }}
              />
            </div>
            <div className="col-12 image-preview ">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <span>{t('admin.quiz.manage.modal_update.non_image')}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('admin.quiz.manage.modal_update.close')}
          </Button>
          <Button variant="primary" onClick={fetchPutQuiz}>
            {t('admin.quiz.manage.modal_update.save_changes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
