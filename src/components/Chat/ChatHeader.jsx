import React, { useState } from 'react';

// API
import * as UserAPI from '../../UserAPI.js';

// Helpers
import Headers from '../../Helpers/Headers.js';

// Components
import AddMembers from '../Channels/AddMembers.jsx';
import ShowChannelMembers from '../Channels/ShowChannelMembers.jsx';

// CSS
import './styles/chatheader.css';

// Icons
import { MdLock } from "react-icons/md";

const ChatHeader = (props) => {

    // Props
    const { chat, chatType, userDB, setUserDB } = props;

    /* State Management */

    const [channelMembers, setChannelMembers] = useState([]);
    const [channelDetails, setChannelDetails] = useState("");

    // Modal State Management
    const [showAddMembers, setShowAddMembers] = useState(false);
    const showMemberModal = () => {
        setShowAddMembers((prev) => !prev);
    };

    const [showMembers, setShowMembers] = useState(false);
    const showAllMemberModal = () => {
        setShowMembers((prev) => !prev);
    };

    const getChannelDetails = () => {
        UserAPI.getChannelDetails(Headers, chat.id)

            .then((res) => {
                setChannelMembers(res.data.data.channel_members);
                setChannelDetails(res.data.data);
            })
            .catch((e) => {
                console.log("No Channel Details");
            });
    };

    return (
        <div className="chat_header_parent">
            <div className="modals">
                <div className="add-members">
                    <AddMembers
                        onclick={showMemberModal}
                        showAddMembers={showAddMembers}
                        setShowAddMembers={setShowAddMembers}
                        chat={chat}
                        channelMembers={channelMembers}
                        userDB={userDB}
                        setUserDB={setUserDB}
                    />
                </div>

                <div className="chat-headers">
                    <ShowChannelMembers
                        onclick={showAllMemberModal}
                        showMembers={showMembers}
                        setShowMembers={setShowMembers}
                        chat={chat}
                        userDB={userDB}
                        channelMembers={channelMembers}
                        channelDetails={channelDetails}
                    />
                </div>

                {chatType === "User" ? (
                    <div className="chat-title">
                        <h1>{chat.uid}</h1> <br />
                        <hr />
                    </div>
                ) : (
                    <div className="channel-header-title" onClick={getChannelDetails}>
                        <div className="header-child">
                            <h1 onClick={showAllMemberModal}>
                                &nbsp;
                                <MdLock style={{ fontSize: "1.5rem" }} />
                                {chat.name}
                            </h1>
                        </div>
                        <div className="header-child">
                            <button onClick={showMemberModal} className="add-people-button">
                                Add People
                            </button>
                        </div>
                    </div>
                )}
            </div>{" "}
        </div>
    )
}

export default ChatHeader
