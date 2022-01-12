import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-solid-svg-icons';

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
                <h1 className={styles.hand}><FontAwesomeIcon icon={faHandPaper} /></h1>
                <h1 className={styles.handText}>Welcome Back</h1>
            </div>
        </motion.div>
    )
}

export default Hand;