import React from "react";
import Avatar from "../../Avatar/Avatar";

// CSS
import "./styles/directmessages.css";

const DirectMessages = (props) => {

    // Props
    const { user, setChat, chat } = props; 

    const clickHandler = (e) => {
      setChat(user);
    };

    let isActive = chat.uid === user.uid ? true : false;

    return (
      /* Direct Messages Component */
      <div
        className={"direct-messages-div " + (isActive ? "isActiveChat" : "")}
        onClick={clickHandler}
      >

        {/* UID Avatar */}
        <div className="direct-messages-avatar">
          <Avatar user={user} size={20} />
        </div>
        
        {/* UID email */}
        <div className="direct-messages-uid">
          {user.uid}
        </div>

      </div>
    );
}

export default DirectMessages;