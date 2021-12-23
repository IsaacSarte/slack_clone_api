import React from 'react';
import { NavLink } from "react-router-dom";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './header.module.css';

const Header = () => {
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