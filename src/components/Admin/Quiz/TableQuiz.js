import Table from 'react-bootstrap/Table';
import '.././Content/Table.scss';
import { useTranslation } from 'react-i18next';

const TableQuiz = props => {
  const { listQuiz, handleBtnUpdateModal, handleBtnDeleteModal } = props;
  const { t } = useTranslation();

  return (
    <Table hover>
      <thead>
        <tr>
          <th scope="col">{t('admin.quiz.manage.table.no')}</th>
          <th scope="col">{t('admin.quiz.manage.table.name')}</th>
          <th scope="col">{t('admin.quiz.manage.table.description')}</th>
          <th scope="col">{t('admin.quiz.manage.table.difficulty')}</th>
          <th scope="col-3">{t('admin.quiz.manage.table.action')}</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz && listQuiz.length > 0 ? (
          listQuiz.map(item => {
            return (
              <tr key={`${item.id}-quiz-table`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => {
                      handleBtnUpdateModal(item);
                    }}
                  >
                    {t('admin.quiz.manage.table.button.update')}
                  </button>
                  <button className="btn btn-danger" onClick={() => handleBtnDeleteModal(item)}>
                    {t('admin.quiz.manage.table.button.delete')}
                  </button>
                </td>
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
