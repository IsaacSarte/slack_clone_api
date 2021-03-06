import React, { useState } from "react";

// API
import * as UserAPI from "../../../UserAPI";

// Helpers
import Headers from "../../../Helpers/Headers";

// Emoji Picker
import Picker from 'emoji-picker-react';


// Framer Motion
import { motion } from 'framer-motion';

// Components
import MarkDown from "./MarkDownModals/MarkDown";

// CSS
import "./styles/chatform.css";

// Icons
import {
  IoAtOutline,
  IoSend,
  IoAttach,
  IoVideocamOutline,
  IoMicOutline,
} from "react-icons/io5";

import {
  BsEmojiSmile,
  BsFillLightningFill,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsLink45Deg,
  BsListOl,
  BsListUl,
  BsBlockquoteLeft,
  BsCodeSquare,
} from "react-icons/bs";

const ChatForm = (props) => {

  // Props
  const { userId, setConvo, chatType } = props;

  /* State Management */
  const [header] = useState(Headers);
  const [chatInput, setChatInput] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  var raw = {
    receiver_id: userId,
    receiver_class: chatType,
    body: `${chatInput}`,
  };

  const onEmojiClick = (event, emojiObject) => {
    setChatInput(prevInput => prevInput + emojiObject.emoji);
  };

  const handleKeyUp = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      //submit
      handleSubmit(e);
      return false;
    }
    if (
      (e.code === "Enter" || (e.location === 3 && e.key === "Enter")) &&
      e.shiftKey
    ) {
      setChatInput(chatInput + "\n");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = chatInput;
    if (chatInput == null || input.trim().length === 0)
      return;
    if (header["access-token"] === undefined)
      return;

    UserAPI.sendMessages(header, raw)
      .then((res) => {
        UserAPI.getMessages(header, userId, chatType)
          .then((res) => {
            setConvo(res.data.data);
          })
          .catch(() => console.log("Failed to get messages"));
      })
      .catch((e) => console.log(e));
    setChatInput("");
  };

  // Function for Not Available Features
  const notAvailable = () => {
    alert("Feature is not yet available");
  };

  // Modal for Add Channel State Management
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="chat-Form">

      {/* Markdown Component */}
      <div className="modal-container">
        <MarkDown
          onclick={openModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>

      <div className="chat-form-container">

        <motion.textarea
          className="chat-input"
          autoFocus
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          value={chatInput}
          onKeyUp={(e) => handleKeyUp(e)}
          initial={{ opacity: 0, width: '0%' }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 2, delay: 0 }}

        />

        {/* Left Side Icons */}
        <div className="chat-form-icons-container">

          <div className="icons-container">

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.9 }}
            >
              <BsFillLightningFill />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons bold"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.85 }}
            >
              <BsTypeBold />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons italic"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.8 }}
            >
              <BsTypeItalic />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.75 }}
            >
              <BsTypeStrikethrough />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.7 }}
            >
              <BsCodeSlash />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.65 }}
            >
              <BsLink45Deg />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons list"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.6 }}
            >
              <BsListOl />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons list"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.5 }}
            >
              <BsListUl />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons list"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.45 }}
            >
              <BsBlockquoteLeft />
            </motion.div>

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.4 }}
            >
              <BsCodeSquare />
            </motion.div>

          </div>

          {/* Right Side Icons */}
          <div className="icons-container">

            <motion.div className="chat-form-icons disabled-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.35 }}
            >
              <IoAtOutline />
            </motion.div>

            {/* Emoji Picker */}
            <motion.div className="emoji-picker"
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0.5rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.3 }}
              onClick={() => setShowPicker(val => !val)}
            >
              <BsEmojiSmile />
              {showPicker && <Picker
                // pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick} />}
            </motion.div>

            <motion.div className="chat-form-icons attach"
              onClick={openModal}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.25 }}
            >
              <IoAttach />
            </motion.div>

            <motion.div
              className="chat-form-icons"
              onClick={notAvailable}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.2 }}
            >
              <IoVideocamOutline />
            </motion.div>

            <motion.div
              className="chat-form-icons mic"
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.15 }}
            >
              <IoMicOutline />
            </motion.div>

            <motion.div
              className="chat-form-icons send-icon"
              onClick={(e) => handleSubmit(e)}
              initial={{ opacity: 0, marginTop: '-2.5rem' }}
              animate={{ opacity: 1, marginTop: '0rem' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.1 }}
            >
              <IoSend />
            </motion.div>

          </div>
          <input type="submit" value="send" className="send"></input>
        </div>
      </div>

    </div>
  );
}

export default ChatForm;
