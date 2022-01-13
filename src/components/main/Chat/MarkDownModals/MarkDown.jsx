import React, { useEffect, useCallback, useRef } from "react";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import './markdown.css';

// Icons
import { MdClose } from "react-icons/md";

const MarkDown = (props) => {
    // Modal Props
    const { showModal, setShowModal } = props;
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    // useCallback
    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    return (
        <div className="markdown-modal">
            {/* Markdown Component */}
            {showModal ? (
                <div className="markdown-background" onClick={closeModal} ref={modalRef}>
                    <motion.div
                        className="modal-wrapper"
                        initial={{ opacity: 0, marginTop: '-60vh' }}
                        animate={{ opacity: 1, marginTop: '-50vh' }}
                        transition={{ duration: 1.25, type: 'spring', bounce: 0.75 }}
                    >
                        <div className="modal-content">
                            <h1 className="modal-header">MarkDown Codes</h1>
                            <br />
                            <p className="modal-p">
                                Use this following syntaxes to make edit your text
                            </p>
                            <br />
                            <span>
                                1. Bold = **text**<br />
                                2. Italic = *text*<br />
                                3. Heading Size = # - no. of # determines the size<br />
                                4. Adding Image = ![Image](url)<br />
                                5. Bulleted List = * list<br />
                                6. Numbered List = 1. list<br />
                            </span>
                            <MdClose
                                className="close-button"
                                aria-label="Close modal"
                                onClick={() => setShowModal((prev) => !prev)}
                            />
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </div>
    )
}

export default MarkDown
