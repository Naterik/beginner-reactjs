import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { useState, useEffect } from "react";
import TableAdmin from "./TableAdmin"
import { IoPersonAdd } from "react-icons/io5";
import { getAllUser, paginateUser } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TablePaginate from "./TablePaginate";


const ManageUser = (props) => {
    const LIMIT = 6
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    useEffect(() => {
        // fetchUser()
        fetchUserPaginate(1);
    }, [])
    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchUserPaginate = async (page) => {
        let res = await paginateUser(page, LIMIT);
        if (res && res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleBtnUpdateModal = (user) => {
        setShowUpdateModal(true)
        setDataUpdate(user)
    }

    const handleBtnViewModal = (user) => {
        setShowViewModal(true)
        setDataUpdate(user)
    }
    const handleBtnDeleteModal = (user) => {
        setShowDeleteModal(true)
        setDataUpdate(user)
    }

    const resetData = () => {
        setDataUpdate({})
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><IoPersonAdd />Add new button</button>
                </div>
            </div>
            {/* <TableAdmin
                listUser={listUser}
                handleBtnUpdateModal={handleBtnUpdateModal}
                handleBtnViewModal={handleBtnViewModal}
                handleBtnDeleteModal={handleBtnDeleteModal}
            /> */}
            <TablePaginate
                listUser={listUser}
                handleBtnUpdateModal={handleBtnUpdateModal}
                handleBtnViewModal={handleBtnViewModal}
                handleBtnDeleteModal={handleBtnDeleteModal}
                fetchUserPaginate={fetchUserPaginate}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ViewUser
                show={showViewModal}
                setShow={setShowViewModal}
                dataUpdate={dataUpdate}
                fetchUser={fetchUserPaginate}
                resetData={resetData}
            />
            <ModalCreateUser
                show={showModal}
                setShow={setShowModal}
                fetchUser={fetchUserPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />

            <ModalUpdateUser
                show={showUpdateModal}
                setShow={setShowUpdateModal}
                dataUpdate={dataUpdate}
                fetchUser={fetchUserPaginate}
                resetData={resetData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
            <ModalDeleteUser
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                dataUpdate={dataUpdate}
                fetchUser={fetchUserPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />

        </div>
    );
};

export default ManageUser;
