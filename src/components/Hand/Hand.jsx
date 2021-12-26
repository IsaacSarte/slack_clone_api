import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/hand.module.css';

const Hand = () => {
    return (
        <motion.div
            className={styles.handShake}
            initial={{ display: 'grid' }}
            animate={{ display: 'none' }}
            transition={{ duration: 15, delay: 2 }}
        >
            <div className={styles.welcomeBack}>
                <h1 className={styles.hand}>👋🏽</h1>
                <h1 className={styles.handText}>Welcome Back</h1>
            </div>
        </motion.div>
    )
}

export default Hand;