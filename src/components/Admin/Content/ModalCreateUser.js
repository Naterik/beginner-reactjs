import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiService";
const ModalCreateUser = (props) => {
    const { show, setShow, fetchUser, currentPage, setCurrentPage } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const handlerPreviewImage = (event) => {
        const filePic = event.target.files[0];
        setImage(filePic);
        if (filePic) {
            setPreviewImage(URL.createObjectURL(filePic));
        }
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handlerAddNewUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }

        let data = await postCreateUser(email, password, username, role, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1);
            await fetchUser(1)
        } else {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                onChange={(event) => {
                                    setRole(event.target.value);
                                }}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus /> Upload image
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => {
                                    handlerPreviewImage(event);
                                }}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (
                                <img src={previewImage} />
                            ) : (
                                <span>Please select your image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handlerAddNewUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateUser;
