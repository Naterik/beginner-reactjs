
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { deleteQuiz } from '../../../services/apiService';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataUpdate, fetchGetAllQuiz } = props
    const handleClose = () => {
        setShow(false);
    };
    const handleDeleteQuiz = async () => {
        let data = await deleteQuiz(dataUpdate.id,);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();

            await fetchGetAllQuiz()
        } else {
            toast.error(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Quiz
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete quiz <b>{dataUpdate && dataUpdate.id ? dataUpdate.id : dataUpdate}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { handleDeleteQuiz() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;

