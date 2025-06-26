import Table from "react-bootstrap/Table";
import "./TableAdmin.scss"
import ReactPaginate from "react-paginate";
const TablePaginate = (props) => {
    const {
        listUser,
        handleBtnUpdateModal,
        handleBtnViewModal,
        handleBtnDeleteModal,
        fetchUserPaginate,
        pageCount,
        currentPage, setCurrentPage
    } = props;
    const handlePageClick = (event) => {
        fetchUserPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <Table hover className="text-center">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col-3"> Action</th>
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
                                                View
                                            </button>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => {
                                                    handleBtnUpdateModal(item);
                                                }}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleBtnDeleteModal(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                                Not found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <ReactPaginate

                    nextLabel="next >"
                    onPageChange={(event) => {
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
