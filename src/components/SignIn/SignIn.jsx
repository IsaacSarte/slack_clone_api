import React, { useState } from 'react';

// React Router
import { NavLink } from 'react-router-dom';

// Axios
import axios from "axios";

// Components
import SignUp from '../SignUp/SignUp.jsx';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/signin.module.css';
import '../styles/loading.css';
import '../styles/form.css';

// Images / Gifs / Videos
import loadingGIF from '../assets/loading.gif';

const SignIn = () => {

    /* State Management */

    // Credentials State Management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Modal State Management
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal((prev) => !prev);
    }

    // Error State Management
    const [error, setError] = useState('');


    // Event Handlers
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleHeader = (res) => {
        if (res.data) {
            localStorage.setItem("access-token", res.headers["access-token"]);
            localStorage.setItem("client", res.headers["client"]);
            localStorage.setItem("uid", res.headers["uid"]);
            localStorage.setItem("expiry", res.headers["expiry"]);

            window.location = '/dashboard';
        }
    }

    const handleSubmit = (e) => {
        const url = 'https://slackapi.avionschool.com/api/v1/auth/sign_in';
        e.preventDefault();

        axios
            .post(url, {
                email: email,
                password: password
            })
            .then((res) => handleHeader(res))
            .catch((e) => {
                setError(e.response.data.errors[0]);
                console.log(`${e}`);
            })
    };

    return (
        <div className={styles.log_reg_container}>
            <div className="loadingContainer">
                <motion.img
                    className="image"
                    src={loadingGIF}
                    alt="Loading..."
                    initial={{ display: 'grid' }}
                    animate={{ display: 'none' }}
                    transition={{ duration: 2, delay: 1 }}
                />
            </div>

            {/* Modal */}
            <SignUp
                onClick={showModal}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

            {/* Main Form */}
            <motion.div
                className="form"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                transition={{ duration: 1, delay: 1.25 }}
            >
                <div className="formText">
                    <p>
                        <NavLink
                            to="/"
                            className="toHome"
                        >
                            islaack
                        </NavLink>
                        {/* Button showing modal of SignUp Component */}
                        <div className={styles.toSignUp}>
                            <motion.span
                                className={styles.newSpan}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2.25 }}
                            >
                                New to Islaack?
                            </motion.span>
                            <motion.span
                                className={styles.toSignUpSpan}
                                onClick={showModal}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2.5 }}
                            >
                                Create an account
                            </motion.span>
                        </div>
                    </p>
                    <h1>Sign in to Islaack</h1>
                    <span className="spanSuggest">We suggest using your preffered <span className="spanStrong">email address.</span></span>
                </div>

                {/* Hr Lines */}
                <div className={styles.hrLines}>
                    <motion.hr
                        className={styles.hrLine1}
                        initial={{ rotate: '-10deg', x: '-5vw' }}
                        animate={{ rotate: '0deg', x: '0vw' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.span
                        className={styles.hrSpanText}
                        initial={{ rotate: '-10deg', x: '-5vw' }}
                        animate={{ rotate: '0deg', x: '0vw' }}
                        transition={{ duration: 1, delay: 1.75 }}
                    >
                        💻
                    </motion.span>
                    <motion.hr
                        className={styles.hrLine2}
                        initial={{ rotate: '-10deg', x: '-5vw' }}
                        animate={{ rotate: '0deg', x: '0vw' }}
                        transition={{ duration: 1, delay: 2 }}
                    />
                </div>

                {/* Form Container */}
                <form
                    className="formContainer"
                    onSubmit={handleSubmit}
                >
                    {/* Email Input */}
                    <input
                        type="email"
                        className="inputText"
                        placeholder="name@email.com"
                        onChange={handleEmailChange}
                        required
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        className="inputPassword"
                        placeholder="password here"
                        onChange={handlePasswordChange}
                        required
                    />

                    <p className="errorStyle">{error}</p>

                    {/* Submit */}
                    <input
                        className="log-regBtn"
                        type="submit"
                        id="submit"
                        value="Sign in with email"
                    />
                </form>
            </motion.div>

            {/* Shape Divider */}
            <div className={styles.custom_shape}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={styles.shape_Fill}></path>
                    <motion.path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        className={styles.shape_Fill2}
                        initial={{ opacity: 0, y: '-5vh', x: '-5vw' }}
                        animate={{ opacity: 1, y: '0vh', x: '0vw' }}
                        transition={{ duration: 1, delay: 2 }}
                    >

                    </motion.path>
                    <motion.path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        className={styles.shape_Fill}
                        initial={{ opacity: 0, y: '-5vh', x: '5vw' }}
                        animate={{ opacity: 1, y: '0vh', x: '0vw' }}
                        transition={{ duration: 1, delay: 2 }}
                    >

                    </motion.path>
                </svg>
            </div>
        </div>
    )
}

export default SignIn;