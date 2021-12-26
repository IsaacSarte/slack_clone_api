import React, { useState, useEffect, useCallback, useRef } from "react";

// API
import * as UserAPI from "../../UserAPI";

// Helpers
import Headers from "../../Helpers/Headers.js";

// Components
import Msg from "../Messages/Msg.js";

// CSS
import './styles/addchannel.css';

// Icons
import { MdClose } from "react-icons/md";

const AddChannel = (props) => {

    const { channelDB } = props;
    const [channelName, setChannelName] = useState("");
    const [userArray] = useState([]);
    const [header] = useState(Headers);

    // Handling Error State Mangement
    const [errors, setErrors] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    useEffect(() => {
        const showMsgTimer = setTimeout(() => {
            setResponseMsg("");
        }, 5000);
        return () => {
            clearInterval(showMsgTimer);
        };
    }, [responseMsg, errors]);

    const onSubmit = (e) => {
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
                // alert(res.data.data.name);
                // console.log(res.data);
            })
            .catch((e) => { });
    };

    const { openModal, setOpenModal } = props;

    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setOpenModal(false);
        }
    };

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
    const updateChannels = channelDB
        ? channelDB.map((channel) => {
            console.log(channel.name);
            return (
                <div className="channel-name" key={channel.id}>
                    {channel.name}
                </div>
            );
        })
        : null;

    return (
        <div className="add-ch-main-modal">
            {responseMsg && <Msg error={errors} message={responseMsg} />}
            {openModal ? (
                <div className="add-ch-background" onClick={closeModal} ref={modalRef}>
                    <div>
                        <div className="add-ch-modal-wrapper">
                            <div className="add-ch-modal-content">
                                <h1 className="add-ch-header">Create a private channel</h1>
                                <span className="add-ch-content">
                                    Channels are where your team communicates. They’re best when
                                    organized around a topic — #marketing, for example.
                                </span>

                                <span className="name-label">Name</span>

                                <div className="addch-form-container">
                                    <form onSubmit={onSubmit}>
                                        <input
                                            className="add-ch-input"
                                            type="text"
                                            onChange={(e) => {
                                                setChannelName(e.target.value);
                                            }}
                                            value={channelName}
                                            onClick={updateChannels}
                                        />
                                        <input
                                            className="add-ch-button"
                                            type="submit"
                                            value="Create"
                                            placeholder="e.g. plan-budget"
                                        />
                                    </form>

                                </div>
                                <MdClose
                                    className="close-modal-button"
                                    aria-label="Close modal"
                                    onClick={() => setOpenModal((prev) => !prev)}
                                />
                            </div>
                        </div>
                    </div>{" "}
                </div>
            ) : null}
        </div>
    );
};

export default AddChannel;
