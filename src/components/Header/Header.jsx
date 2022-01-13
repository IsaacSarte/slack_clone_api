import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

// Framer Motion
import { motion } from 'framer-motion';

// Speechly
import { useSpeechContext } from '@speechly/react-client';

// CSS
import styles from './styles/header.module.css';

const Header = () => {
    // Speechly
    const { segment } = useSpeechContext();

    useEffect(() => {
        if (segment) {
            if (segment.isFinal && segment.intent.intent === 'log_in') {
                window.location = "/signin";
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [segment])

    return (
        <header className={styles.header}>
            <motion.nav
                className={styles.nav}
                initial={{ visibility: 'hidden', y: '-5vh' }}
                animate={{ visibility: 'visible', y: '0vh' }}
                transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 2 }}
            >
                <NavLink
                    to="/"
                    exact
                    className={styles.logo}
                >
                    islaack
                </NavLink>
                <ul className={styles.ul}>
                    <li>Product</li>
                    <li>Solutions</li>
                    <li>Resources</li>
                </ul>
                <NavLink to="/signin" exact>
                    <button className={styles.loginBtn}>Create a New WorkSpace</button>
                </NavLink>
            </motion.nav>
        </header>
    )
}

export default Header