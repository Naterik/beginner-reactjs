import Table from 'react-bootstrap/Table';
import '../Admin/Content/Table.scss';
import { useTranslation } from 'react-i18next';
import { getHistory } from '../../services/apiService';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment/moment';
const TableQuiz = props => {
  const { t } = useTranslation();
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    fetchGetHistory();
  }, []);
  const fetchGetHistory = async () => {
    const res = await getHistory();
    if (res && res.EC === 0) {
      let cloneHistory = _.cloneDeep(res?.DT?.data);
      let newData = cloneHistory.map(item => {
        return {
          id: item?.id,
          name: item?.quizHistory.name,
          total_correct: item?.total_correct,
          total_questions: item?.total_questions,
          date: moment(item?.updatedAt).utc().format('DD/MM/YYYY hh:mm:ss A'),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListHistory(newData);
    }
  };
  return (
    <Table hover>
      <thead>
        <tr>
          <th scope="col">{t('admin.quiz.manage.table.no')}</th>
          <th scope="col">{t('header.history.quiz_name')}</th>
          <th scope="col">{t('header.history.total_quiz')}</th>
          <th scope="col">{t('header.history.total_correct')}</th>
          <th scope="col-3">{t('header.history.date')}</th>
        </tr>
      </thead>
      <tbody>
        {listHistory && listHistory.length > 0 ? (
          listHistory.map(item => {
            return (
              <tr key={`${item.id}-quiz-table`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.total_questions}</td>
                <td>{item.total_correct}</td>
                <td>{item.date}</td>
                <td></td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: 'center' }}>
              {t('admin.quiz.manage.table.not_found')}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableQuiz;
