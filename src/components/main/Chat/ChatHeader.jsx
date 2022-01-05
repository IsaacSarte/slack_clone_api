import React, { useState } from "react";

// API
import * as UserAPI from "../../../UserAPI";

// Helpers
import Headers from "../../../Helpers/Headers";

// Components
import AddMembers from "../Channel/AddMembers";
import ShowChannelMembers from "../Channel/ShowChannelMembers";

// Framer Motion
import {motion} from 'framer-motion';

// CSS
import "./styles/chatheader.css";

// Icons
import { MdLock } from "react-icons/md";

const ChatHeader = (props) => {

    // Props
    const { chat, chatType, userDb, setUserDb } = props;

    /* State Management */
    
    // Modal for Adding Members
    const [showAddMembers, setShowAddMembers] = useState(false);
    const openMemberModal = () => {
      setShowAddMembers((prev) => !prev);
    };

    // Modal for Showing Channel Members
    const [showMembers, setShowMembers] = useState(false);
    const openAllMemberModal = () => {
      setShowMembers((prev) => !prev);
    };

    const [channelMembers, setChannelMembers] = useState([]);
    const [channelDetails, setChannelDetails] = useState("");

    const getChannelDetails = () => {
      UserAPI.getChannelDetails(Headers, chat.id)
        .then((res) => {
          setChannelMembers(res.data.data.channel_members);
          setChannelDetails(res.data.data);
        })
        .catch((e) => {
          console.log("no channel details");
        });
    };

    return (
      <div className="chat-header-parent">

        {/* Add Member Modal Component */}
        <div className="modals">
          <div className="add-members">
              <AddMembers
                onclick={openMemberModal}
                showAddMembers={showAddMembers}
                setShowAddMembers={setShowAddMembers}
                chat={chat}
                channelMembers={channelMembers}
                userDb={userDb}
                setUserDb={setUserDb}
              />
          </div>

          {/* Show Modal Members Modal Component */}
          <div className="chat-headers">
            <ShowChannelMembers
              onclick={openAllMemberModal}
              showMembers={showMembers}
              setShowMembers={setShowMembers}
              chat={chat}
              userDb={userDb}
              channelMembers={channelMembers}
              channelDetails={channelDetails}
            />
          </div>

          {chatType === "User" ? (
            <div 
              className="chat-title"
            >
                <motion.h1
                  initial={{opacity: 0, marginLeft: '-10rem' }}
                  animate={{ opacity: 1, marginLeft: '1rem'}}
                  transition={{type: 'spring', bounce: 0.5, duration: 1, delay: 0.5}}
                >
                  {chat.uid}
                </motion.h1> 
                <br />
                <hr />
            </div>
          ) : (
            <div className="channel-header-title" onClick={getChannelDetails}>
              <div className="header-child">
                <motion.h1 
                  onClick={openAllMemberModal}
                  initial={{opacity: 0, marginLeft: '-10rem' }}
                  animate={{ opacity: 1, marginLeft: '1rem'}}
                  transition={{type: 'spring', bounce: 0.5, duration: 1, delay: 0.5}}
                >
                  <MdLock style={{ fontSize: "1.5rem" }} />
                  &nbsp;
                  {chat.name}
                  <br />
                  <hr />
                </motion.h1>
              </div>
              <div className="header-child">
                <button onClick={openMemberModal} className="add-people-button">
                  Add People
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default ChatHeader;
