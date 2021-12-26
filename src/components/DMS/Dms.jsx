import React from 'react';

// CSS
import './styles/dms.css';

const Dms = ({ user, chat, setChat }) => {

    const handleClick = (e) => {
        setChat(user);
    };

    let isActive = chat.uid === user.uid ? true : false;

    return (
        <div
            className={"direct-messages-div " + (isActive ? "isActiveChat" : "")}
            onClick={handleClick}
        >

            <div className="direct-messages-avatar">

            </div>

            <div className="direct-messages-uid">
                {user.uid}
            </div>

        </div>
    )
}

export default Dms;