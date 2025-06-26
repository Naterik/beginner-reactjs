import axios from ".././utils/axiosCustomize"
const postCreateUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    let res = axios.post(`api/v1/participant`, data);
    return res
};

const getAllUser = () => {
    return axios.get("api/v1/participant/all")
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id)
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.put("api/v1/participant", data)
}

const deleteUser = (id) => {
    return axios.delete("api/v1/participant", { data: { id: id } })
}
const paginateUser = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

//auth
const loginUser = (email, password) => {

    return axios.post('api/v1/login', { email, password })
}
const registerUser = (username, email, password) => {

    return axios.post('api/v1/register', { username, email, password })
}
export { postCreateUser, getAllUser, putUpdateUser, deleteUser, paginateUser, loginUser, registerUser };
