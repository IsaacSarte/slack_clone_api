import React, { useState, useEffect, useCallback, useRef } from "react";

// API
import * as UserAPI from "../../UserAPI";

// Helpers
import Headers from "../../Helpers/Headers.js";

// Components
import Msg from "../Messages/Msg.js";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import styles from './styles/addchannel.module.css';

// Icons
import { MdClose } from "react-icons/md";

const AddChannel = (props) => {

    // Props
    const { channelDB, openModal, setOpenModal } = props;

    /* State Management */

    const [channelName, setChannelName] = useState("");
    const [userArray] = useState([]);
    const [header] = useState(Headers);

    // Handling Error State Mangement
    const [errors, setErrors] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    /* useEffect */

    useEffect(() => {
        const showMsgTimer = setTimeout(() => {
            setResponseMsg("");
        }, 5000);

        return () => {
            clearInterval(showMsgTimer);
        };
    }, [responseMsg, errors]);

    const handleSubmit = (e) => {
        e.preventDefault();

        UserAPI.createChannel(header, {
            name: channelName,
            user_ids: userArray,
        })
            .then((res) => {
                if (res.data.errors !== undefined) {
                    setErrors(true);
                    setResponseMsg("");
                    setResponseMsg(res.data.errors[0]);
                } else {
                    setErrors(false);
                    setResponseMsg("");
                    setResponseMsg(`New channel ${res.data.data.name} has been created!`);
                }
            })
    };


    // useRef
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setOpenModal(false);
        }
    };

    // useCallback
    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && openModal) {
                setOpenModal(false);
            }
        },
        [setOpenModal, openModal]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    //not working!!!
    const updateChannels = channelDB ?
        channelDB.map((channel) => {
            console.log(channel.name);
            return (
                <div className="channel-name" key={channel.id}>
                    {channel.name}
                </div>
            );
        }) :
        null;

    return (
        <div className="add_Channel_Modal">

            {/* Error Message */}
            {responseMsg &&
                <Msg
                    error={errors}
                    message={responseMsg}
                />
            }

            {/* Modal Component */}
            {openModal ? (
                <div className={styles.add_Channel_Background} onClick={closeModal} ref={modalRef}>
                    <div>
                        <motion.div
                            className={styles.add_Channel_modal_wrapper}
                            initial={{ opacity: 0, y: '-10vh' }}
                            animate={{ opacity: 1, y: '0vh' }}
                            transition={{ duration: 1.25, type: 'spring', bounce: 0.75 }}
                        >
                            <div className={styles.add_Channel_Modal_Content}>
                                <h1 className={styles.add_Channel_Header}>Create a private channel</h1>
                                <span className={styles.add_Channel_Content}>
                                    Channels are where your team communicates. They’re best when
                                    organized around a topic — #marketing, for example.
                                </span>

                                <span className={styles.nameLabel}>Name</span>

                                <div className={styles.add_Channel_Form}>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            className={styles.add_Channel_Input}
                                            type="text"
                                            onChange={(e) => {
                                                setChannelName(e.target.value);
                                            }}
                                            value={channelName}
                                            onClick={updateChannels}
                                        />
                                        <input
                                            className={styles.add_ChannelBtn}
                                            type="submit"
                                            value="Create"
                                            placeholder="e.g. plan-budget"
                                        />
                                    </form>

                                </div>
                                <MdClose
                                    className={styles.closeBtn}
                                    aria-label="Close modal"
                                    onClick={() => setOpenModal((prev) => !prev)}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AddChannel;