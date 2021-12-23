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
import styles from './signin.module.css';
import '../styles/loading.css';
import '../styles/form.css';

// Images / Gifs / Videos
import loadingGIF from '../assets/loading.gif';

const SignIn = () => {

    /* State Management */

    // Credentials State Management
    const [email, setEmail] = useState('');
    const [password, setPassword] = ('');

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
        e.preventDefault();
        const url = 'https://slackapi.avionschool.com/api/v1/auth/sign_in';

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
    }

    // Modal State Management
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal((prev) => !prev);
    }

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
                        type="text"
                        className="inputText"
                        placeholder="name@email.com"
                        name="email"
                        onChange={handleEmailChange}
                        required
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        className="inputPassword"
                        placeholder="password here"
                        name="password"
                        onChange={handlePasswordChange}
                        required
                    />

                    <p className="errorStyle">{error}</p>

                    {/* Submit */}
                    <button
                        className="log-regBtn"
                        type="submit"
                        id="submit"
                    >
                        Sign In with Email
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default SignIn;