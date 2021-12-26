import React, {useState, useEffect} from 'react';

// Helpers
import Headers from '../../Helpers/Headers.js';

// Components
import SidebarOptions from './SidebarOptions.jsx';
import Dms from '../DMS/Dms.jsx';
import AddChannel from '../Channels/AddChannel.jsx';

// Framer Motion
import {motion} from 'framer-motion';

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

    // Modal State Management
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal((prev) => !prev);
    };

    // Features not included in the user stories
    const notAvailable = () => {
        alert("Feature is not yet available");
    };

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
                            <motion.div 
                                className="sidebar-h2"
                                initial={{ visibility: 'hidden'}}
                                animate={{ visibility: 'visible'}}
                                transition={{ duration: 2, delay: 0.5 }}
                            >
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
                            </motion.div>

                            {/* User Name */}
                            <motion.div 
                                className="user-name"
                                initial={{ visibility: 'hidden'}}
                                animate={{ visibility: 'visible'}}
                                transition={{ duration: 2, delay: 0.5 }}
                            >
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
                            </motion.div>

                        </div>

                        <div className="sidebar-options">

                            {/* Not Available Features */}
                            <div className="not-available" onClick={notAvailable}>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5}}
                                >
                                    <SidebarOptions Icon={RiChat1Line} title="Threads" />
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.55}}
                                >
                                    <SidebarOptions Icon={RiQuestionAnswerLine} title="All DMs" />
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6}}
                                >
                                    <SidebarOptions Icon={RiAtLine} title="Mentions & reactions" />
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.65}}
                                >
                                    <SidebarOptions Icon={RiMore2Fill} title="More" />
                                </motion.div>
                            </div>

                            {/* Add Channel Modal */}
                            <motion.div 
                                onClick={showModal}
                                initial={{opacity: 0}}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7}}
                            >
                                <SidebarOptions 
                                    onClick={showModal}
                                    Icon={RiAddFill}
                                    title="Add Channel"
                                />
                            </motion.div>
                            
                        </div>

                    </div>

                    <motion.div
                        className="expander-div sidebar-option-container"
                        onClick={() => setChannelsExpanded(!channelsExpanded)}
                        initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75}}
                    >
                        {channelsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}
                        &nbsp;Channels
                    </motion.div>
                    <motion.div
                        className={
                            channelsExpanded ? "direct-messages expanded" : "direct-messages"
                        }
                        initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75}}
                    >
                        {displayChannels}
                    </motion.div>
                    <motion.div
                        className="expander-div sidebar-option-container"
                        onClick={() => setDmsExpanded(!dmsExpanded)}
                        initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75}}
                    >
                        {dmsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}
                        &nbsp;Direct Messages
                    </motion.div>
                    <motion.div 
                        className={
                            dmsExpanded ? "direct-messages expanded" : "direct-messages"
                        }
                        initial={{opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75}}
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
                    </motion.div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar;
