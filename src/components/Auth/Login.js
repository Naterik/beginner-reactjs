import React, { useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/apiService';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value)

    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {


        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }
        let data = await loginUser(email, password)
        if (data && data.EC === 0) {
            toast.success("Login success")
            navigate("/user")
        } else {
            toast.error(` ${data.EM}`)
        }

    }

    return (
        <>
            <div className='login-content'>
                <div className=' header'>
                    Have a question?
                    <button className='ms-2 btn-signup' onClick={() => { navigate("/register") }} >Sign up</button>
                </div>
                <div className="welcome">
                    Welcome to my web
                </div>
                <div className="title">
                    Get better data with conversational forms, surveys, quizzes & more.
                </div>

                <div className='content-form'>
                    <div className='input-form'>
                        <label className="form-label">Email</label>
                        <input className="form-control"
                            type='text'
                            value={email}
                            onChange={(e) => { handleEmail(e) }}
                        ></input>
                    </div>
                    <div className='input-form'>
                        <label className="form-label">Password</label>
                        <input className="form-control"
                            type='password'
                            value={password}
                            onChange={(e) => { handlePassword(e) }}
                        ></input>
                    </div>
                    <span>Forget password ?</span>
                    <button
                        type='submit'
                        onClick={() => { handleLogin() }}
                    >Login to Khuong app</button>
                    <span className='text-center' onClick={() => { navigate("/") }}>
                        &#60;&#60; Go back to homepage
                    </span>
                </div>

            </div>
        </>
    )
}

export default Login