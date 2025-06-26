import React, { useState } from 'react'
import { MdQuiz } from "react-icons/md";
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";
import { registerUser } from '../../services/apiService';
import { toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
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
    const handleSignUp = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }

        let data = await registerUser(username, email, password);
        if (data && data.EC === 0) {
            toast.success(`${data.EM}`);
            navigate("/")
        } else {
            toast.error(`${data.EM}`)
        }
    }
    return (
        <>
            <div className="register-container">
                <div className='header'>
                    Already have an account? <button className='ms-2 btn-login' onClick={() => { navigate("/login") }}>Login</button>
                </div>
                <div className='welcome'>
                    <MdQuiz /> Quiz app
                </div>
                <div className='title'>
                    Get better data with conversational forms, surveys, quizzes & more.
                </div>

                <div className='register-content'>
                    <div className='register-form'>
                        <label className='form-label'>Username</label>
                        <input className='form-control' value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
                    </div>
                    <div className='register-form'>
                        <label className='form-label'>Email</label>
                        <input className='form-control' value={email} onChange={(event) => { setEmail(event.target.value) }}></input>
                    </div>
                    <div className='register-form'>
                        <label className='form-label'>Password</label>

                        <input className='form-control' type={isVisible ? "text" : "password"} value={password} onChange={(event) => { handlePassword(event) }}></input>

                        <span style={password ? { display: 'block' } : { display: 'none' }} onClick={() => { setIsVisible(!isVisible) }}>{!isVisible ? <RiEyeOffLine /> : <RiEyeLine />}</span>



                    </div>
                    <button
                        type='submit'
                        onClick={() => { handleSignUp() }}
                    >Sign up</button>
                    <article className='text-center' onClick={() => { navigate("/") }}>&#60;&#60; Go back to homepage</article>

                </div>
            </div>
        </>
    )
}

export default Register