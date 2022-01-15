import React, { useEffect, useCallback, useRef } from "react";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import './speechly.css';

// Icons
import { MdClose } from "react-icons/md";

const Speechly = (props) => {
    // Modal Props
    const { showSpeechly, setShowSpeechly } = props;
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowSpeechly(false);
        }
    };

    // useCallback
    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showSpeechly) {
                setShowSpeechly(false);
            }
        },
        [setShowSpeechly, showSpeechly]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    return (
        <div className="speechly-modal">
            {/* Speechly Component */}
            {showSpeechly ? (
                <div className="speechly-background" onClick={closeModal} ref={modalRef}>
                    <motion.div
                        className="speechly-wrapper"
                        initial={{ opacity: 0, marginTop: '-60vh' }}
                        animate={{ opacity: 1, marginTop: '-50vh' }}
                        transition={{ duration: 1.25, type: 'spring', bounce: 0.75 }}
                    >
                        <div className="speechly-content">
                            <h1 className="speechly-header">Voice Bot</h1>
                            <br />
                            <p className="speechly-p">
                                Hold the talk button on the top right of the page to<br />
                                try saying this available following commands:
                            </p>
                            <br />
                            <span>
                                1. Log out email<br />
                                2. Create channel<br />
                            </span>
                            <br />
                            <p className="speechly-p">
                                More commands will be available soon😊
                            </p>
                            <MdClose
                                className="close-button-speechly"
                                aria-label="Close modal"
                                onClick={() => setShowSpeechly((prev) => !prev)}
                            />
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </div>
    )
}

export default Speechly
