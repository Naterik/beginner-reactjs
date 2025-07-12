import React, { useState, useEffect } from 'react';
import { getAllQuiz, postCreateAnswer, postCreateQuestion } from '../../../services/apiService';
import Select from 'react-select';
import { FcAddImage } from 'react-icons/fc';
import { BsPatchPlusFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
import { BsPatchMinusFill } from 'react-icons/bs';
import { BiMinusCircle } from 'react-icons/bi';
import './ManageQuestions.scss';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from 'react-awesome-lightbox';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // Thêm import này

const ManageQuestions = () => {
  const { t } = useTranslation();

  const initQuestion = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
      ],
    },
  ];
  const [listQuestion, setListQuestion] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({ url: '', name: '' });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchGetAllQuiz();
  }, []);
  const fetchGetAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let options = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(options);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          },
        ],
      };
      setListQuestion([...listQuestion, newQuestion]);
    }
    if (type === 'REMOVE') {
      let filter = _.cloneDeep(listQuestion).filter(item => item.id !== id);
      setListQuestion(filter);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(listQuestion);

    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      };
      let index = questionClone.findIndex(item => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setListQuestion(questionClone);
    }
    if (type === 'REMOVE') {
      let index = questionClone.findIndex(item => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        item => item.id !== answerId
      );
      console.log(questionClone);
      setListQuestion(questionClone);
    }
  };
  const handleOnChange = (type, questionId, answerId, event) => {
    let cloneQuestion = _.cloneDeep(listQuestion);
    if (type === 'QUESTION') {
      let index = cloneQuestion.findIndex(item => item.id === questionId);
      if (index > -1) {
        cloneQuestion[index].description = event;
        setListQuestion(cloneQuestion);
      }
    }
    if (type === 'ANSWER') {
      let question = cloneQuestion.findIndex(item => item.id === questionId);
      let index = cloneQuestion[question].answers.findIndex(item => item.id === answerId);
      if (index > -1) {
        cloneQuestion[question].answers[index].description = event;
        setListQuestion(cloneQuestion);
      }
    }
    if (type === 'CHECKBOX') {
      let question = cloneQuestion.findIndex(item => item.id === questionId);
      if (question > -1) {
        cloneQuestion[question].answers = cloneQuestion[question].answers.map(answer => {
          if (answer.id === answerId) {
            answer.isCorrect = event;
          }
          return answer;
        });
        setListQuestion(cloneQuestion);
      }
    }
  };
  const handleUploadImage = (questionId, event) => {
    let cloneQuestion = _.cloneDeep(listQuestion);
    let index = cloneQuestion.findIndex(item => item.id === questionId);
    if (index > -1 && event && event.target.files[0]) {
      cloneQuestion[index].imageFile = event.target.files[0];
      cloneQuestion[index].imageName = event.target.files[0].name;
      setListQuestion(cloneQuestion);
    }
  };
  const handlePreviewImage = questionId => {
    let cloneQuestion = _.cloneDeep(listQuestion);
    let index = cloneQuestion.findIndex(item => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: cloneQuestion[index].imageFile,
        name: cloneQuestion[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  const validateAnswer = () => {
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0,
      isChecked = 0;
    for (let i = 0; i < listQuestion.length; ++i) {
      for (let j = 0; j < listQuestion[i].answers.length; ++j) {
        if (!listQuestion[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
        if (listQuestion[i].answers[j].isCorrect) {
          isChecked++;
        }
      }
      indexQ = i;
      if (!isValidAnswer) break;
    }
    if (isValidAnswer === false) {
      toast.error(t('question.error_answer_required', { numQ: indexQ + 1, numA: indexA + 1 }));
      return false;
    }
    if (isChecked === 0) {
      toast.error(t('question.error_one_answer_required'));
      return false;
    }
    return true;
  };

  const validateQuestion = () => {
    const findInvalid = listQuestion.findIndex(item => !item.description);
    if (findInvalid !== -1) {
      toast.error(t('question.error_question_description_required', { num: findInvalid + 1 }));
      return false;
    }
    return true;
  };
  const handleSubmitQuestion = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error(t('admin.quiz.update_qa.error_select_quiz'));
      return;
    }
    if (!validateAnswer()) return;
    if (!validateQuestion()) return;
    try {
      for (const question of listQuestion) {
        const q = await postCreateQuestion(
          +selectedQuiz.value,
          question.description,
          question.imageFile
        );
        for (const answer of question.answers) {
          const a = await postCreateAnswer(q.DT.id, answer.description, answer.isCorrect);
        }
      }
      toast.success(t('admin.quiz.update_qa.save_button'));
      setListQuestion(initQuestion);
      setSelectedQuiz(null);
    } catch (error) {
      toast.error(t('admin.quiz.update_qa.upsert_fail_error', { error }));
    }
  };
  return (
    <div className="question-container row">
      <div className="fs-2 fw-semibold lh-sm mb-2">{t('admin.quiz.update_qa.title')}</div>
      <hr />
      <div className="question-content">
        <label>{t('admin.quiz.update_qa.select_quiz')}:</label>
        <div className="question-select col-6">
          <Select value={selectedQuiz} options={listQuiz} onChange={setSelectedQuiz} />
        </div>

        {listQuestion.map((quest, idx) => (
          <div key={quest.id}>
            <div className="question-add row">
              <label>{t('admin.quiz.update_qa.add_questions', { num: idx + 1 })}:</label>
              <div className="question-description col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('admin.quiz.update_qa.question_description_placeholder', {
                      num: idx + 1,
                    })}
                    value={quest.description}
                    onChange={e => handleOnChange('QUESTION', quest.id, null, e.target.value)}
                  />
                  <label>
                    {t('admin.quiz.update_qa.question_description_label', { num: idx + 1 })}
                  </label>
                </div>
              </div>
              <div className="image-upload col-md-4">
                <label htmlFor={quest.id}>
                  <FcAddImage size={40} />
                </label>
                <input
                  type="file"
                  id={quest.id}
                  hidden
                  multiple
                  onChange={e => handleUploadImage(quest.id, e)}
                  className="form-control"
                />
                <span>
                  {quest.imageName ? (
                    <span onClick={() => handlePreviewImage(quest.id)}>{quest.imageName}</span>
                  ) : (
                    t('admin.quiz.update_qa.no_file_selected')
                  )}
                </span>
                <span onClick={() => handleAddRemoveQuestion('ADD')}>
                  <BsPatchPlusFill size={25} className="icon-plus" />
                </span>
                {listQuestion.length > 1 && (
                  <span onClick={() => handleAddRemoveQuestion('REMOVE', quest.id)}>
                    <BsPatchMinusFill size={25} className="icon-minus" />
                  </span>
                )}
              </div>
            </div>

            {quest.answers.map((answer, ai) => (
              <div key={answer.id} className="answer-content row mb-3">
                <div className="answer d-flex align-items-center">
                  <div className="form-check me-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={answer.isCorrect}
                      onChange={e =>
                        handleOnChange('CHECKBOX', quest.id, answer.id, e.target.checked)
                      }
                    />
                  </div>
                  <div className="form-floating col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('admin.quiz.update_qa.answer_placeholder', { num: ai + 1 })}
                      value={answer.description}
                      onChange={e => handleOnChange('ANSWER', quest.id, answer.id, e.target.value)}
                    />
                    <label>{t('admin.quiz.update_qa.answer_label', { num: ai + 1 })}</label>
                  </div>
                  <div className="answer-icons ms-3 d-flex align-items-center">
                    <span onClick={() => handleAddRemoveAnswer('ADD', quest.id)}>
                      <BsPlusCircleFill size={25} className="icon-plus" />
                    </span>
                    {quest.answers.length > 1 && (
                      <span onClick={() => handleAddRemoveAnswer('REMOVE', quest.id, answer.id)}>
                        <BiMinusCircle size={29} className="icon-minus" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {listQuestion.length > 0 && (
          <button className="btn btn-primary col-1" onClick={handleSubmitQuestion}>
            {t('admin.quiz.update_qa.save_button')}
          </button>
        )}

        {isPreviewImage && (
          <Lightbox
            image={URL.createObjectURL(dataImagePreview.url)}
            title={dataImagePreview.name}
            onClose={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
