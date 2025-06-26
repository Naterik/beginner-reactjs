import React from 'react'
import User from "./components/User/User";
import Admin from "./components/Admin/Admin"
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />}></Route>
                    <Route path="/user" element={<User />} />
                </Route>
                <Route path="admin" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
        </>
    )
}

export default Layout