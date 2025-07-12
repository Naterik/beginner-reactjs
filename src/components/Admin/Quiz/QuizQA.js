import React, { useState, useEffect } from 'react';
import {
  getAllQuiz,
  getQuizWithQuestionAnswer,
  postCreateAnswer,
  postCreateQuestion,
  postUpsertQuizWithQA,
} from '../../../services/apiService';
import Select from 'react-select';
import { FcAddImage } from 'react-icons/fc';
import { BsPatchPlusFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
import { BsPatchMinusFill } from 'react-icons/bs';
import { BiMinusCircle } from 'react-icons/bi';
import './QuizQA.scss';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from 'react-awesome-lightbox';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const QuizQA = () => {
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
  useEffect(() => {
    if (selectedQuiz) {
      fetchQuizWithQuestionAnswer();
    }
  }, [selectedQuiz]);
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
  const fetchQuizWithQuestionAnswer = async () => {
    const res = await getQuizWithQuestionAnswer(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newfile = [];
      for (let i = 0; i < res.DT.qa.length; ++i) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question - ${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:text/png;base64,${q.imageFile}`,
            `Question - ${q.id}.png`,
            `text/png`
          );
        }
        newfile.push(q);
      }
      setListQuestion(newfile);
    }
  };

  const fetchUpsertQA = async () => {
    const cloneQuestion = _.cloneDeep(listQuestion);
    for (let i = 0; i < cloneQuestion.length; ++i) {
      if (cloneQuestion[i].imageFile) {
        cloneQuestion[i].imageFile = await toBase64(cloneQuestion[i].imageFile);
      }
    }

    let res = await postUpsertQuizWithQA({
      quizId: selectedQuiz.value,
      questions: cloneQuestion,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
      return false;
    }
    return true;
  };
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith('data:')) {
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }));
  }

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
      toast.error(
        `Please enter the answer for the question ${indexQ + 1} and answer  ${indexA + 1}`
      );
      return false;
    }
    if (isChecked === 0) {
      toast.error('Please select one answer');
      return false;
    }
    return true;
  };

  const validateQuestion = () => {
    const findInvalid = listQuestion.findIndex(item => !item.description);
    if (findInvalid !== -1) {
      toast.error(`Please write the description for question ${findInvalid + 1}`);
      return false;
    }
    return true;
  };
  const handleSubmitQuestion = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please select your quiz');
      return;
    }
    if (!validateAnswer()) return;
    if (!validateQuestion()) return;
    try {
      if (fetchUpsertQA()) {
        setListQuestion(initQuestion);
        setSelectedQuiz(null);
      }
    } catch (error) {
      toast.error(`Upsert fail with error ${error}`);
    }
  };
  return (
    <div className="question-container row">
      <div className="question-content">
        <label>{t('admin.quiz.update_qa.select_quiz')}:</label>
        <div className="question-select col-6">
          <Select value={selectedQuiz} options={listQuiz} onChange={setSelectedQuiz} />
        </div>
        {listQuestion.length > 0 &&
          listQuestion.map((quest, index) => {
            return (
              <div key={quest.id}>
                <div className="question-add row">
                  <label>{t('admin.quiz.update_qa.add_questions', { num: index + 1 })}:</label>
                  <div className="question-description col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('admin.quiz.update_qa.question_description_placeholder', {
                          num: index + 1,
                        })}
                        value={quest.description}
                        onChange={event => {
                          handleOnChange('QUESTION', quest.id, null, event.target.value);
                        }}
                      />
                      <label>
                        {t('admin.quiz.update_qa.question_description_label', {
                          num: index + 1,
                        })}
                      </label>
                    </div>
                  </div>
                  <div className="image-upload col-md-4">
                    <label htmlFor={`${quest.id}`}>
                      <FcAddImage size={40} />
                    </label>

                    <input
                      className="form-control "
                      type={'file'}
                      id={`${quest.id}`}
                      multiple
                      hidden
                      onChange={event => {
                        handleUploadImage(quest.id, event);
                      }}
                    />
                    <span>
                      {quest.imageName ? (
                        <span onClick={() => handlePreviewImage(quest.id)}>{quest.imageName}</span>
                      ) : (
                        t('admin.quiz.update_qa.no_file_selected')
                      )}
                    </span>
                    <span
                      onClick={() => {
                        handleAddRemoveQuestion('ADD');
                      }}
                    >
                      <BsPatchPlusFill size={25} className="icon-plus" />
                    </span>
                    {listQuestion.length > 1 && (
                      <span
                        onClick={() => {
                          handleAddRemoveQuestion('REMOVE', quest.id);
                        }}
                      >
                        <BsPatchMinusFill size={25} className="icon-minus" />
                      </span>
                    )}
                  </div>
                </div>
                {quest.answers.map((answer, ansIndex) => {
                  return (
                    <div key={answer.id} className="answer-content row mb-3">
                      <div className="answer">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input "
                            type={'checkbox'}
                            checked={answer.isCorrect}
                            onChange={event => {
                              handleOnChange('CHECKBOX', quest.id, answer.id, event.target.checked);
                            }}
                          />
                        </div>
                        <div className="form-floating col-6 ">
                          <input
                            type="text"
                            className="form-control "
                            placeholder={t('admin.quiz.update_qa.answer_placeholder', {
                              num: ansIndex + 1,
                            })}
                            value={answer.description}
                            onChange={event => {
                              handleOnChange('ANSWER', quest.id, answer.id, event.target.value);
                            }}
                          />
                          <label>
                            {t('admin.quiz.update_qa.answer_label', {
                              num: ansIndex + 1,
                            })}
                          </label>
                        </div>
                        <div className="answer-icons ms-3 d-flex align-items-center">
                          <span onClick={() => handleAddRemoveAnswer('ADD', quest.id)}>
                            <BsPlusCircleFill size={25} className="icon-plus" />
                          </span>
                          {quest.answers.length > 1 && (
                            <span
                              onClick={() => handleAddRemoveAnswer('REMOVE', quest.id, answer.id)}
                            >
                              <BiMinusCircle size={29} className="icon-minus" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        {listQuestion && listQuestion.length > 0 && (
          <button
            className="btn btn-primary col-1"
            onClick={() => {
              handleSubmitQuestion();
            }}
          >
            {t('admin.quiz.update_qa.save_button')}
          </button>
        )}
        {isPreviewImage && dataImagePreview.url && (
          <Lightbox
            image={URL.createObjectURL(dataImagePreview.url)}
            title={dataImagePreview.name}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
