import React, { useEffect, useState } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { getQuizDetail, submitAnswer } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalShowResult from './ModalShowResult';
import QuestionSession from './QuestionSession';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
const DetailQuiz = () => {
  const { t } = useTranslation();
  const quizId = useParams().id;
  const location = useLocation();
  const [listDetailQuiz, setListDetailQuiz] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState({});
  const [index, setIndex] = useState(0);
  useEffect(() => {
    handleGetDetailQuiz();
  }, [quizId]);
  const handleGetDetailQuiz = async () => {
    const res = await getQuizDetail(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      //cần trình bày dữ liệu mà mình muốn trả về sẽ có dạng như nào
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy('id')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            item.answers.isCorrect = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ['id'], ['asc']);
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setListDetailQuiz(data);
    }
  };
  const handleSelectedAnswer = (answerId, questionId) => {
    let data = _.cloneDeep(listDetailQuiz);
    let question = data.find(item => +item.questionId === +questionId);
    if (question && question.answers) {
      question.answers.map(q => {
        if (+q.id === +answerId) {
          q.isSelected = !q.isSelected;
        }
        return q;
      });
    }
    let index = data.findIndex(item => +item.questionId === +questionId);
    if (index > -1) {
      data[index] = question;
      setListDetailQuiz(data);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (listDetailQuiz && listDetailQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleShowAnswer = () => {
    setIsShowAnswer(true);
  };
  const handleFinish = async () => {
    const payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (listDetailQuiz && listDetailQuiz.length > 0) {
      listDetailQuiz.forEach(item => {
        let questionId = +item.questionId;
        let userAnswerId = [];
        item.answers.forEach(a => {
          if (a.isSelected === true) userAnswerId.push(a.id);
        });
        answers.push({ questionId, userAnswerId });
      });
    }
    payload.answers = answers;
    let res = await submitAnswer(payload);
    if (res) {
      setIsSubmit(true);
      setResult({
        countCorrect: res?.DT?.countCorrect,
        countTotal: res?.DT?.countTotal,
        quizData: res?.DT?.quizData,
      });
      setShowResult(true);
      //update DataQuiz with correct answer

      if (res && res.DT.quizData) {
        let dataClone = _.cloneDeep(listDetailQuiz);
        let a = res.DT.quizData;
        for (let q of a) {
          console.log('q:', q);
          for (let i = 0; i < dataClone.length; ++i) {
            if (+q.questionId === +dataClone[i].questionId) {
              //push isCorrect
              let updateCorrect = [];
              for (let j = 0; j < dataClone[i].answers.length; ++j) {
                let findCorrect = q.systemAnswers.find(
                  item => +item.id === +dataClone[i].answers[j].id
                );
                if (findCorrect) {
                  dataClone[i].answers[j].isCorrect = true;
                }
                updateCorrect.push(dataClone[i].answers[j]);
              }
              dataClone[i].answers = updateCorrect;
            }
          }
        }
        setListDetailQuiz(dataClone);
        console.log('dataClone', dataClone);
      }
    }
  };
  return (
    <>
      <Breadcrumb className="breadcrumb-header container">
        <NavLink to="/" className="breadcrumb-item">
          {t('header.home')}
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          {t('header.user')}
        </NavLink>
        <Breadcrumb.Item active>{t('header.detail_quiz')}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="detail-quiz-container container ">
        <div className="detail-content">
          <div className="detail-body">
            <h3>
              Quiz {quizId}:{location?.state?.quizTitle}
            </h3>
          </div>
          <hr />
          <div className="question-content">
            <Question
              question={listDetailQuiz && listDetailQuiz.length > 0 ? listDetailQuiz[index] : []}
              index={index}
              handleCheckbox={handleSelectedAnswer}
              setIsPreviewImage={setIsPreviewImage}
              isPreviewImage={isPreviewImage}
              isShowAnswer={isShowAnswer}
            />
            <ModalShowResult
              show={showResult}
              setShow={setShowResult}
              result={result}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
          <div className="d-flex justify-content-center gap-3 question-button">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handlePrev();
              }}
            >
              {t('quiz.pre_button')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleNext();
              }}
            >
              {t('quiz.next_button')}
            </button>
            <button
              disabled={isSubmit}
              className="btn btn-success"
              onClick={() => {
                handleFinish();
              }}
            >
              {t('quiz.finish')}
            </button>
          </div>
        </div>

        <div className="question-session">
          <QuestionSession
            listDetailQuiz={listDetailQuiz}
            handleFinish={handleFinish}
            setIndex={setIndex}
            isSubmit={isSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default DetailQuiz;
