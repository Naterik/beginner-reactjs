import Table from 'react-bootstrap/Table';
import './Table.scss';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
const TablePaginate = props => {
  const {
    listUser,
    handleBtnUpdateModal,
    handleBtnViewModal,
    handleBtnDeleteModal,
    fetchUserPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
  } = props;
  const { t } = useTranslation();
  const handlePageClick = event => {
    fetchUserPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th scope="col"> {t('admin.user.table.no')}</th>
            <th scope="col">{t('admin.user.table.username')}</th>
            <th scope="col">{t('admin.user.table.email')}</th>
            <th scope="col">{t('admin.user.table.role')}</th>
            <th scope="col-3"> {t('admin.user.table.action')}</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <>
                  <tr key={`${item.id}-users`}>
                    <th scope="row">{item.id}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          handleBtnViewModal(item);
                        }}
                      >
                        {t('admin.user.table.button.view')}
                      </button>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => {
                          handleBtnUpdateModal(item);
                        }}
                      >
                        {t('admin.user.table.button.update')}
                      </button>
                      <button className="btn btn-danger" onClick={() => handleBtnDeleteModal(item)}>
                        {t('admin.user.table.button.delete')}
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>
                {t('admin.user.table.error')}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={event => {
            handlePageClick(event);
          }}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={+pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TablePaginate;
