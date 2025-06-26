
import Table from 'react-bootstrap/Table';
import "./TableAdmin.scss"
const TableAdmin = (props) => {
    const { listUser, handleBtnUpdateModal, handleBtnViewModal, handleBtnDeleteModal } = props

    return (
        <Table hover className='text-center'>
            <thead >
                <tr >
                    <th scope="col">No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col-3"> Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <>
                                <tr key={`${item.id}-users`}>
                                    <th scope="row" >{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => { handleBtnViewModal(item) }}>View</button>
                                        <button className='btn btn-warning mx-3' onClick={() => { handleBtnUpdateModal(item) }}>Update</button>
                                        <button className='btn btn-danger' onClick={() => handleBtnDeleteModal(item)}>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
                {
                    listUser && listUser.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>Not found</td></tr>
                }
            </tbody>
        </Table>
    );
}

export default TableAdmin