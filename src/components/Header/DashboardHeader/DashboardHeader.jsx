import React from 'react';

// Components
import SearchBar from '../../Searchbar/SearchBar.js';
import LogOut from '../../LogOut/LogOut.jsx';

// CSS
import styles from './styles/dashboardheader.module.css';

// Icons
import { FiClock } from "react-icons/fi";

const DashboardHeader = (props) => {

    // Props
    const { userDB, setUserDB, channelDB, setChat } = props;

    return (
        <div className={styles.dashboard_Header}>
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
        </div>
    )
}

export default DashboardHeader;