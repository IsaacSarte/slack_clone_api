import React, {useState, useEffect} from 'react';

// Helpers
import Headers from '../../Helpers/Headers.js';

// Components
import SidebarOptions from './SidebarOptions.jsx';
import Dms from '../DMS/Dms.jsx';
import AddChannel from '../Channels/AddChannel.jsx';

// CSS
import './styles/sidebar.css';

// Icons
import {
    RiPencilFill,
    RiCheckboxBlankCircleFill,
    RiQuestionAnswerLine,
    RiChat1Line,
    RiAtLine,
    RiMore2Fill,
    RiLockLine,
    RiArrowDownSFill,
    RiArrowRightSFill,
    RiAddFill,
} from "react-icons/ri";

const Sidebar = (props) => {

    // Props
    const {chat, setChat, channelDB, recentDMS} = props;

    /* State Management */

    const [setUserChannels] = useState([]);
    const [setUserName] = useState([]);
    const [dmsExpanded, setDmsExpanded] = useState(true);
    const [channelsExpanded, setChannelsExpanded] = useState(true);
    const [isInRecents, setIsInRecents] = useState(false);

    // Modal State Management
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal((prev) => !prev);
    };

    // Features not included in the user stories
    const notAvailable = () => {
        alert("Feature is not yet available");
    };

    /* useEffect */

    useEffect(() => {
        if (chat.name) {
            setIsInRecents(true);
            return;
        }
        // if channel, then do nothing
        else if (chat.uid) {
            let found = recentDMS.find((recents) => recents.uid === chat.uid);
            
            if (found) {
                setIsInRecents(true);
            }
            else {
                setIsInRecents(false);
            }
        }
    },[chat, recentDMS]);

    // Displaying Channels
    const displayChannels = channelDB ?
        channelDB.map((channel) => {
            let isActive = false;

            if (chat.name === channel.name)
                isActive = true;

            return (
                <div
                    className={"channel-name " + (isActive ? "isActiveChat" : "")}
                    key={channel.id}
                    onClick={(e) => {
                        let channelName = e.target.textContent.trim();
                        let selectedChannel = channelDB.find (
                            (ch) => ch.name === channelName
                        );
                        setChat(selectedChannel);
                    }}
                >
                    <RiLockLine /> &nbsp; {channel.name}
                </div>
            )
        }) : null;


    return (
        <div className="modal-container">

            {/* Add Channel Component */}
            <AddChannel 
                setUserChannels={setUserChannels}
                setUserName={setUserName}
                onClick={showModal}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

            {/* Sidebar Scroll */}
            <div className="sidebar-scrollhider">

                <div className="sidebar-container">

                    <div className="sidebar-header">
                        
                        <div className="sidebar-info">

                            {/* Title */}
                            <div className="sidebar-h2">
                                <h2>Islaack</h2>
                                &nbsp;
                                <RiPencilFill
                                    style={{
                                        padding: "3px",
                                        marginRight: "20px",
                                        backgroundColor: "white",
                                        fontSize: "1.5rem",
                                        color: "#49274b",
                                        borderRadius: "999px",
                                    }}
                                />
                            </div>

                            {/* User Name */}
                            <div className="user-name">
                                <h3>
                                <RiCheckboxBlankCircleFill
                                    style={{
                                    marginTop: "1px",
                                    marginRight: "9px",
                                    fontSize: "12px",
                                    color: "green",
                                    }}
                                /> &nbsp;
                                {Headers.uid} 
                                </h3>
                            </div>

                        </div>

                        <div className="sidebar-options">

                            {/* Not Available Features */}
                            <div className="not-available" onClick={notAvailable}>
                                <SidebarOptions Icon={RiChat1Line} title="Threads" />
                                <SidebarOptions Icon={RiQuestionAnswerLine} title="All DMs" />
                                <SidebarOptions Icon={RiAtLine} title="Mentions & reactions" />
                                <SidebarOptions Icon={RiMore2Fill} title="More" />
                            </div>

                            {/* Add Channel Modal */}
                            <div 
                                onClick={showModal}
                            >
                                <SidebarOptions 
                                    onClick={showModal}
                                    Icon={RiAddFill}
                                    title="Add Channel"
                                />
                            </div>
                            
                        </div>

                    </div>

                    <div
                        className="expander-div sidebar-option-container"
                        onClick={() => setChannelsExpanded(!channelsExpanded)}
                    >
                        {channelsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}{" "}
                        &nbsp;Channels

                    </div>
                    <div
                        className={
                            channelsExpanded ? "direct-messages expanded" : "direct-messages"
                        }
                    >
                        {displayChannels}
                    </div>
                    <div
                        className="expander-div sidebar-option-container"
                        onClick={() => setDmsExpanded(!dmsExpanded)}
                    >
                        {dmsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}{" "}
                        &nbsp;Direct Messages
                    </div>
                    <div 
                        className={
                            dmsExpanded ? "direct-messages expanded" : "direct-messages"
                        }
                    >
                        {!isInRecents && (
                         <Dms 
                            user={chat}
                            setChat={setChat}
                            chat={chat}
                         />   
                        )}
                        {recentDMS.map((user) => {
                            return (
                                <div className="direct-message-user">
                                    <Dms 
                                        key={user.id}
                                        user={user}
                                        setChat={setChat}
                                        chat={chat}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar;
