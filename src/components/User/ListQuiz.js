import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getQuizByUser } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    getListQuiz();
  }, []);
  const getListQuiz = async () => {
    let res = await getQuizByUser();

    if (res && res.EC === 0) {
      return setListQuiz(res.DT);
    }
  };
  return (
    <>
      <div className="d-flex flex-wrap gap-5 container">
        {listQuiz &&
          listQuiz.length > 0 &&
          listQuiz.map((item, index) => {
            return (
              <Card key={`${item.id}-card`} style={{ width: '18rem' }}>
                <Card.Img
                  className="img-fluid h-50"
                  variant="top"
                  src={`data:image/png;base64,${item.image}`}
                />
                <Card.Body>
                  <Card.Title>
                    {t('quiz.title')}
                    {index + 1}
                  </Card.Title>
                  <Card.Text className="h-25">{item.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } });
                    }}
                  >
                    {t('quiz.button')}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        {listQuiz.length === 0 && <div>{t('quiz.error')}</div>}
      </div>
    </>
  );
};

export default ListQuiz;
