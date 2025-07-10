import _ from 'lodash';
import { useState } from 'react';

import Lightbox from 'react-awesome-lightbox';
const Question = props => {
  const { question, index, handleCheckbox, isPreviewImage, setIsPreviewImage } = props;

  if (_.isEmpty(question)) {
    return;
  }

  const handlePreviewImage = () => {
    setIsPreviewImage(true);
  };

  const handleSelectedCheckbox = (event, aId, qId) => {
    handleCheckbox(aId, qId);
  };
  return (
    <>
      {question.image ? (
        <div className="question-img" onClick={() => handlePreviewImage()}>
          <img style={{ cursor: 'pointer' }} src={`data:image/png;base64,${question.image}`} />
        </div>
      ) : (
        <div className="question-img"></div>
      )}

      <div className="question-name text-center lead ">
        Question {index + 1}: {question.questionDescription}
      </div>
      <div className="answer">
        {question.answers.length > 0 &&
          question.answers.map((item, index) => {
            return (
              <div key={`${index + 1}-quest`} className="form-check child">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.isSelected}
                  onChange={event => {
                    handleSelectedCheckbox(event, item.id, question.questionId);
                  }}
                />
                <label className="form-check-label">{item.description}</label>
              </div>
            );
          })}
      </div>
      {isPreviewImage && (
        <Lightbox
          image={`data:image/png;base64,${question.image}`}
          title={isPreviewImage.name}
          onClose={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}
    </>
  );
};

export default Question;
