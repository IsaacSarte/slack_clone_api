import React, { useState, useEffect, useCallback, useRef } from "react";

// API
import * as UserAPI from "../../../UserAPI";

// Helpers
import Headers from "../../../Helpers/Headers";

// Components
import ErrMsg from "../ErrorMsg/ErrMsg.jsx";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import "./styles/addchannel.css";

// Icons
import { MdClose } from "react-icons/md";

const AddChannel = (props) => {

  // Props
  const { channelDb } = props;

  /* State Management */
  const [channelName, setChannelName] = useState("");
  const [userArray] = useState([]);
  const [header] = useState(Headers);

  // Error State management
  const [errors, setErrors] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  /* useEffect */
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
          setShowModal(false);
          setResponseMsg("");
          console.log(res);
          setResponseMsg(res.data.errors[0]);
        }
        else {
          setErrors(false);
          setShowModal(false);
          setResponseMsg("");
          setResponseMsg(`New channel ${res.data.data.name} has been created!`);
        }
      })
      .catch((e) => { });
  };

  // Modal Props
  const { showModal, setShowModal } = props;
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  // useCallback
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  //not working!!!
  const updateChannels = channelDb
    ? channelDb.map((channel) => {
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
      {/* Error Message */}
      {responseMsg && <ErrMsg error={errors} message={responseMsg} />}

      {/* Add Channel Modal Component */}
      {showModal ? (
        <div className="add-ch-background" onClick={closeModal} ref={modalRef}>
          <div>
            <motion.div
              className="add-ch-modal-wrapper"
              initial={{ opacity: 0, marginTop: '-10vh' }}
              animate={{ opacity: 1, marginTop: '0vh' }}
              transition={{ duration: 1.25, type: 'spring', bounce: 0.75 }}
            >
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
                      value="Create Channel"
                      placeholder="e.g. plan-budget"
                    />
                  </form>
                </div>
                <MdClose
                  className="close-modal-button"
                  aria-label="Close modal"
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddChannel;
