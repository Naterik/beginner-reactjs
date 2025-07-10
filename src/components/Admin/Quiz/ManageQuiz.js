import React, { useRef, useState, useEffect } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { getAllQuiz, postCreateQuiz } from '../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation } from 'react-i18next';

const ManageQuiz = () => {
  const { t } = useTranslation();

  const ref = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState({ value: 'EASY', label: 'EASY' });
  const [image, setImage] = useState('');
  const [listQuiz, setListQuiz] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const options = [
    { value: 'EASY', label: t('admin.quiz.manage.form.quiz_difficulty.easy') },
    { value: 'MEDIUM', label: t('admin.quiz.manage.form.quiz_difficulty.medium') },
    { value: 'HARD', label: t('admin.quiz.manage.form.quiz_difficulty.hard') },
  ];

  useEffect(() => {
    fetchGetAllQuiz();
  }, []);

  useEffect(() => {
    setType({ value: 'EASY', label: t('admin.quiz.manage.form.quiz_difficulty.easy') });
  }, [t]);

  const fetchGetAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleClear = () => {
    setName('');
    setDescription('');
    setType({ value: 'EASY', label: t('admin.quiz.manage.form.quiz_difficulty.easy') });
    if (ref.current) {
      ref.current.value = '';
    }
    setImage('');
  };

  const handleBtnUpdateModal = quiz => {
    setShowUpdate(true);
    setDataUpdate(quiz);
  };

  const handleBtnDeleteModal = quiz => {
    setShowDelete(true);
    setDataUpdate(quiz);
  };

  const handleImage = event => {
    setImage(event.target.files[0]);
  };

  const fetchCreateQuiz = async () => {
    if (!name || !description) {
      toast.error(t('admin.quiz.manage.form.name_description_required_error'));
      return;
    }
    let res = await postCreateQuiz(name, description, type?.value, image);

    if (res && res.EC === 0) {
      toast.success(`${res.EM}`);
      handleClear();
      fetchGetAllQuiz();
    } else {
      toast.error(`${res.EM}`);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="quiz-title fs-2">
            {t('admin.quiz.manage.form.title')}
          </Accordion.Header>
          <Accordion.Body>
            <div className="quiz-add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3 fs-6">
                  {t('admin.quiz.manage.form.add_new_quiz_legend')}
                </legend>
                <div className="quiz-content">
                  <div className="form-floating ">
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={event => {
                        setName(event.target.value);
                      }}
                      placeholder={t('admin.quiz.manage.form.name')}
                    />
                    <label>{t('admin.quiz.manage.form.name')}</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={event => {
                        setDescription(event.target.value);
                      }}
                      placeholder={t('admin.quiz.manage.form.description')}
                    />
                    <label>{t('admin.quiz.manage.form.description')}</label>
                  </div>
                  <Select options={options} value={type} onChange={setType} />
                  <div className="mb-3">
                    <label className="form-label">
                      {t('admin.quiz.manage.form.image_upload_label')}
                    </label>
                    <input
                      className="form-control"
                      ref={ref}
                      onChange={event => {
                        handleImage(event);
                      }}
                      type="file"
                    />
                  </div>
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn btn-primary "
                      onClick={() => {
                        fetchCreateQuiz();
                      }}
                    >
                      {t('admin.quiz.manage.form.save')}
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="quiz-detail">
              <TableQuiz
                listQuiz={listQuiz}
                handleBtnUpdateModal={handleBtnUpdateModal}
                handleBtnDeleteModal={handleBtnDeleteModal}
              />
              <ModalUpdateQuiz
                show={showUpdate}
                listQuiz={listQuiz}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchGetAllQuiz={fetchGetAllQuiz}
              />
              <ModalDeleteQuiz
                show={showDelete}
                setShow={setShowDelete}
                dataUpdate={dataUpdate}
                fetchGetAllQuiz={fetchGetAllQuiz}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="quiz-title fs-2">
            {t('admin.quiz.update_qa.title')}
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="quiz-title fs-2">
            {t('admin.quiz.assign_to_user')}
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
