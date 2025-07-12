import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalShowResult = props => {
  const { show, setShow, result, handleShowAnswer } = props;
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Total question: <b>{result.countTotal}</b>
          </p>
          <p>
            Your correct answer: <b>{result.countCorrect}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            Show answer
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalShowResult;
