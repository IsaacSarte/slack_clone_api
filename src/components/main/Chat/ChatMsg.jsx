import React from "react";

// API
import Avatar from "../../Avatar/Avatar";

// Helpers
import { formatDay, formatTime } from "../../../Helpers/Date";

import ReactMarkdown from "react-markdown";

// Components

// CSS
import "./styles/chatmsg.css";

// Icons
import { FaAngleDown } from "react-icons/fa";

const ChatMsg = (props) => {
  const { sender, time, msg, isSameDay, isWithin3Mins } = props;

  return (
    <div className="msg-container-parent">
      {!isSameDay ? (
        <div className="date-divider-wrapper">
          <div className="date-divider">
            <div className="date-divider-text">
              {formatDay(time)}{" "}
              <p className="down-icon-divider">
                <FaAngleDown />
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {!isWithin3Mins ? (
        <div className="first-container">
          <div className="avatarContainer">
            <Avatar user={sender} size={40} />
          </div>
          <div className="msgWrapper">
            <div className="titleWrapper">
              <p className="sender">
                <span className="sender-Text">{sender.uid}</span>
              </p>
              <p className="time">{formatTime(time)}</p>
            </div>
            <div className="body"><ReactMarkdown>{msg}</ReactMarkdown></div>
          </div>
        </div>
      ) : (
        <div className="second-container">
          <div className="time-div">
            {formatTime(time).slice(0, -3)}
          </div>
          <div className="body-second">
            <ReactMarkdown>
              {msg}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMsg;