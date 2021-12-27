import React from 'react';

// CSS
import styles from './styles/sections.module.css';

const Sections = () => {
    return (
        <>
            {/* First Section */}
            <section>

                <div className={styles.section_Top_Text}>
                    <h1 className={styles.section_H1}>👋🏽 Welcome Back</h1>
                </div>

                <div className={styles.section_Container}>
                    <div className={styles.section_Card}>

                    </div>

                    <div className={styles.section_Card}>

                    </div>

                    <div className={styles.section_Card}>

                    </div>
                </div>

                <div className={styles.section_Container_Two}>
                    <div className={styles.section_Card_Two}>

                    </div>
                </div>

                <div>
                    <footer className={styles.section_Footer}>

                    </footer>
                </div>

            </section>

        </>
    )
}

export default Sections;