import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/sections.module.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-solid-svg-icons';

// Video
import sec2vid from '../assets/sec2vid.mp4';
import sec3vid from '../assets/sec3vid.mp4';

const Sections = () => {
    return (
        <>
            {/* First Section */}
            <section>

                <div className={styles.section_Top_Text}>
                    <h1 className={styles.section_H1}><span className={styles.section_Hand}><FontAwesomeIcon icon={faHandPaper} /></span> Welcome Back</h1>
                </div>

                <div className={styles.section_Container}>
                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '-5vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <h1 className={styles.card_H1}>
                            An easier, more organized way to work
                        </h1>
                        <iframe title="youtube video" className={styles.section_Video} src="https://www.youtube.com/embed/sprDCCFUd4A?control=0" />
                    </motion.div>

                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '5vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <h1 className={styles.card_H1}>
                            Give projects a dedicated channel
                        </h1>
                        <video className={styles.section_Video} autoPlay loop muted>
                            <source src={sec2vid} type="video/mp4" />
                        </video>
                    </motion.div>

                    <motion.div
                        className={styles.section_Card}
                        initial={{ y: '-2vh' }}
                        animate={{ y: '0vh' }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <h1 className={styles.card_H1}>
                            Stay looped in, not out
                        </h1>
                        <video className={styles.section_Video} autoPlay loop muted>
                            <source src={sec3vid} type="video/mp4" />
                        </video>
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