import React, { useRef, useState } from 'react';
import CountDown from './CountDown';

const QuestionSession = props => {
  const refClick = useRef([]);
  const { listDetailQuiz, handleFinish, setIndex, isSubmit } = props;

  const onTimeUp = () => {
    handleFinish();
  };

  const handleSelectQuestion = (question, index) => {
    if (question) {
      const selectedAnswer = question.answers.some(item => item.isSelected === true);
      if (selectedAnswer) {
        return 'question selected';
      }
    }
    return 'question ';
  };
  const handleClick = (question, index) => {
    console.log('refClick.current', refClick.current);
    if (refClick.current) {
      refClick.current.forEach((item, index) => {
        if (item.className === 'question click') {
          item.className = 'question';
        }
      });
    }
    setIndex(index);
    if (question.answers.length > 0) {
      const selectedAnswer = question.answers.find(item => item.isSelected === true);
      if (selectedAnswer) {
        return;
      }
    }
    refClick.current[index].className = 'question click';
  };

  return (
    <>
      <CountDown onTimeUp={onTimeUp} isSubmit={isSubmit} />
      <hr />
      <div className="session-container">
        {listDetailQuiz.length > 0 &&
          listDetailQuiz.map((item, index) => {
            return (
              <div
                key={`question ${index + 1}`}
                className={handleSelectQuestion(item)}
                onClick={() => {
                  handleClick(item, index);
                }}
                ref={e => (refClick.current[index] = e)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default QuestionSession;
