import React from 'react';

// Components
import Hand from '../components/Hand/Hand.jsx';
import Header from '../components/Header/Header';
import Sections from '../components/Sections/Sections.jsx';

// Framer Motion
import {motion} from 'framer-motion';

// CSS
import styles from './styles/home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <Header />
            <Hand />

            {/* Section */}
            <motion.div
                className={styles.section}
                initial={{ visibility: 'hidden', }}
                animate={{ visibility: 'visible', }}
                transition={{ duration: 1, delay: 2 }}
            >
                <Sections />
            </motion.div>
        </div>
    )
}

export default Home;