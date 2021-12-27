import React from "react";

// Components
import SearchBar from "../SearchBar/SearchBar";
import LogOut from '../../LogOut/LogOut.jsx'

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import "./styles/header.css";

// Icons
import { FiClock } from "react-icons/fi";

const Header = (props) => {

  // Props
  const { userDb, channelDb, setChat, setUserDb } = props;

  return (
      /* Main Header Component */
      <div className="main-Header">

          {/* Clock Icon */}
          <motion.div
            initial={{ opacity: 0, marginTop: '-5rem' }}
            animate={{ opacity: 1, marginTop: '0.25rem' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 0 }}
          >
            <FiClock 
              style={{
                fontSize: "18px",
                color: "white",
              }}
            />
          </motion.div>

          {/* Search Bar Component */}
          <motion.div
            initial={{ opacity: 0, marginTop: '-5rem' }}
            animate={{ opacity: 1, marginTop: '0rem' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 0 }}
          >
            <SearchBar
              placeholder="Search for members..."
              userDb={userDb}
              setUserDb={setUserDb}
              channelDb={channelDb}
              setChatWith={setChat}
            />
          </motion.div>

          {/* Log Out Component */}
          <motion.div 
            className="logout-Btn"
            initial={{ opacity: 0, marginTop: '-5rem' }}
            animate={{ opacity: 1, marginTop: '-1.5rem' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 0 }}
          >
            <LogOut />
          </motion.div>
          
      </div>
  );
}

export default Header;