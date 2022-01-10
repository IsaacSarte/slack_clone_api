import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/sections.module.css';

const Sections = () => {
    return (
        <>
            {/* First Section */}
            <section>

                <div className={styles.section_Top_Text}>
                    <h1 className={styles.section_H1}><span className={styles.section_Hand}><i class="fas fa-hand-paper"></i></span> Welcome Back</h1>
                </div>

                <div className={styles.section_Container}>
                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '-5vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >

                    </motion.div>

                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '5vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >

                    </motion.div>

                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '-2vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >

                    </motion.div>
                </div>

                {/* Footer */}
                {/* Shape Divider */}
                <motion.div
                    className={styles.section_shape_Divider}
                    initial={{ marginLeft: '-15rem' }}
                    animate={{ marginLeft: '0rem' }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 0L0 0 598.97 114.72 1200 0z" className={styles.shape_FillS}></path>
                    </svg>

                    <motion.div
                        className={styles.footer_Text}
                        initial={{ marginLeft: '-15rem' }}
                        animate={{ marginLeft: '5rem' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <footer>
                            <span>For Educational Purposes Only</span>
                            <span className={styles.footer_SecText}> - Isaac Sarte</span>
                        </footer>
                    </motion.div>
                </motion.div>

            </section>

        </>
    )
}

export default Sections;