import React, {useState, useEffect} from 'react';

// Components
import ChatArea from './ChatArea';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';

// CSS
import './styles/chat.css';

const Chat = (props) => {

    // Props
    const {chat, recentDMS, userDB, setRecentDMS, setUserDB} = props;

    /* State Management */
    const [chatWith, setChatWith] = useState("");
    const [convo, setConvo] = useState([]);
    const [chatType, setChatType] = useState("User"); // can be Channel, CAPITALIZE FIRST LETTER!

    /* useEffect */

    useEffect(() => {
        if (!chat) 
            return;

        if (chat["owner_id"] !== undefined) {
          // if object passed has owner id, set chat type to channel!
          setChatType("Channel");
          setChatWith(chat);
        } 
        else if (chat["email"] !== undefined) {
          // if chat has property: email, single user lang siya
          setChatType("User");
          setChatWith(chat);
        }  
    },[chat])

    return (
        <div className="chat">
            <div className="chat-header">
                <ChatHeader
                chat={chat}
                chatType={chatType}
                userDB={userDB}
                setUserDB={setUserDB}
                />
            </div>
            <ChatArea
                userId={chatWith.id}
                userEmail={chatWith.uid}
                convo={convo}
                setConvo={setConvo}
                chatType={chatType}
                recentDMS={recentDMS}
                setRecentDMS={setRecentDMS}
                chat={chat}
                userDB={userDB}
            />
            <ChatForm
                userId={chatWith.id}
                setConvo={setConvo}
                convo={convo}
                userEmail={chatWith.uid}
                chatType={chatType}
            />
        </div>
    )
}

export default Chat;