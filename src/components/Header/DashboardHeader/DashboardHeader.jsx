import React from 'react';

// Components
import SearchBar from '../../Searchbar/SearchBar.js';
import LogOut from '../../LogOut/LogOut.jsx';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/dashboardheader.module.css';

// Icons
import { FiClock } from "react-icons/fi";

const DashboardHeader = (props) => {

    // Props
    const { userDB, setUserDB, channelDB, setChat } = props;

    return (
        <motion.div
            className={styles.dashboard_Header}
            initial={{ visibility: 'hidden', y: '-5vh' }}
            animate={{ visibility: 'visible', y: '0vh' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 0 }}
        >
            {/* Clock Icon */}
            <FiClock
                style={{
                    fontSize: "18px",
                    color: "white",
                }}
            />
            {/* Search Bar Component */}
            <SearchBar
                userDB={userDB}
                setUserDB={setUserDB}
                channelDB={channelDB}
                setChatWith={setChat}
            />

            {/* Log Out Component */}
            <LogOut />
        </motion.div>
    )
}

export default DashboardHeader;