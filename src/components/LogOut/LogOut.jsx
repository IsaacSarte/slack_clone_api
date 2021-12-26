import React from 'react';

// API
import AuthAPI from '../../Services/AuthAPI.js';

// CSS
import styles from './logout.module.css';

// Icons
import { MdOutlineLogout } from "react-icons/md"

const LogOut = () => {

    const logout = () => {
        AuthAPI.logout();
        window.location = "/";
    }

    return (
        <div className={styles.logout}>
            {/* Logout Button */}
            <MdOutlineLogout size={"25"} onClick={logout} />
        </div>
    )
}

export default LogOut;
