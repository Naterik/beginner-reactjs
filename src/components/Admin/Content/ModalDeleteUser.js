import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { deleteUser } from '../../../services/apiService';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataUpdate, fetchUser, currentPage, setCurrentPage } = props
    const handleClose = () => {
        setShow(false);
    };
    const handleDeleteUser = async () => {
        let data = await deleteUser(dataUpdate.id,);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1)
            await fetchUser(1)
        } else {
            toast.error(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete user <b>{dataUpdate && dataUpdate.email ? dataUpdate.email : dataUpdate}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { handleDeleteUser() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;