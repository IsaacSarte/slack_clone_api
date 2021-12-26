import React, { useState, useEffect, useRef, useCallback } from 'react';

// Axios
import axios from 'axios';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './signup.module.css';
import '../styles/form.css';

// Icons
import { MdClose } from "react-icons/md";

const SignUp = (props) => {

    // Props
    const { openModal, setOpenModal } = props;

    /* State Management */

    // Credientials State Management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Error State Management
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "https://slackapi.avionschool.com/api/v1/auth/";

        axios
            .post(url, {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
            .then((res) => {
                localStorage.setItem("access-token", res.headers["access-token"]);
                localStorage.setItem("client", res.headers["client"]);
                localStorage.setItem("uid", res.headers["uid"]);
                localStorage.setItem("expiry", res.headers["expiry"]);
                window.location = '/dashboard';
            })
            .catch((e) => {
                console.log(e.response.data.errors.full_messages[0]);
                setError(e.response.data.errors.full_messages[0]);
            });
    }

    // Password Border Color Styling
    const colorBorder = (pword, confirmPword) => {
        if (pword === confirmPword) {
            return {
                border: '2px solid #003805'
            };
        }
        else {
            return {
                border: '2px solid #660d0d',
            };
        }
    }

    // Modal useRef
    const modalRef = useRef();

    const hideModal = (e) => {
        if (modalRef.current === e.target) {
            setOpenModal(false);
        }
    }

    // Modal useCallback or when esc key is pressed
    const escPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && openModal) {
                setOpenModal(false);
                console.log(`${e.key} : Key Pressed`)
            }
        },
        [setOpenModal, openModal]
    )

    // Modal useCallback with useEffect
    useEffect(() => {
        document.addEventListener("keydown", escPress);
        return () => document.removeEventListener("keydown", escPress);
    })

    return (
        <>
            {openModal ? (
                <>
                    <div className={styles.sign_reg_Container} onClick={hideModal} ref={modalRef}>
                        <motion.div
                            className={styles.signup_wrapper}
                            initial={{ opacity: 0, y: '-10vh' }}
                            animate={{ opacity: 1, y: '0vh' }}
                            transition={{ duration: 1.25, type: 'spring', bounce: 0.75 }}
                        >
                            <MdClose
                                className={styles.close_modal_button}
                                aria-label="Close modal"
                                onClick={() => setOpenModal((prev) => !prev)}
                            />

                            <div className="formText">
                                <h1>First, enter your credentials</h1>
                                <span className="spanSuggest">We suggest using your preffered <span className="spanStrong">email address.</span></span>
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
                                    name="email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    required
                                />

                                {/* Password Input */}
                                <input
                                    type="password"
                                    className="inputPassword"
                                    placeholder="password here"
                                    name="password"
                                    style={password && confirmPassword !== ""
                                        ? colorBorder(password, confirmPassword)
                                        : null
                                    }
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                />

                                <input
                                    type="password"
                                    className="inputPassword"
                                    placeholder="confirm password"
                                    name="confirmPassword"
                                    style={password && confirmPassword !== ""
                                        ? colorBorder(password, confirmPassword)
                                        : null
                                    }
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    required
                                />

                                <p className="errorStyle">{error}</p>

                                {/* Submit */}
                                <button
                                    className="log-regBtn"
                                    type="submit"
                                    id="submit"
                                >
                                    Sign Up
                                </button>
                                <p className={styles.policyReg}>
                                    By continuing, you are agreeing to our Customer Terms <br />
                                    of Service, Privacy Policy, and Cookie Policy.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default SignUp;