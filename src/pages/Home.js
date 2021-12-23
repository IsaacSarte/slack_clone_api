import React from 'react';

// Components
import Hand from '../components/Hand/Hand.jsx';
import Header from '../components/Header/Header';

// CSS
import styles from './home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <Header />
            <Hand />
        </div>
    )
}

export default Home
