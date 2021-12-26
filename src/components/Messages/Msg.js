import React from 'react';

// CSS
import styles from './msg.module.css';

const Msg = (props) => {

    // Props
    const {error, message} = props;

    return (
        <div className={styles.msg}>
            <div
                className={
                    error ?
                    styles.msg_text_error : 
                    styles.msg_text_success
                }
            >
                {message}
            </div>
        </div>
    )
}

export default Msg;