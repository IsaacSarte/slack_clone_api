import React, { useEffect, useCallback, useRef } from "react";

// Components
import ChannelDetails from "./ChannelDetails";

// CSS
import './styles/showchannelmembers.css';

// Icons
import { MdClose, MdLock } from "react-icons/md";
import { BiPhone, BiBell, BiChevronDown, BiStar } from "react-icons/bi";

function ShowChannelMembers(props) {
  const { userDB, channelMembers, channelDetails } = props;

  const displayChannelMembers = channelMembers.map((member) => {
    let user = userDB.find((user) => user.id === member.user_id);
    return (
      <div className="channel-members" key={member.user_id}>
        {user.uid}
      </div>
    );
  });

  const getUid = (id) => {
    if (userDB[0].uid) {
      let uid = userDB.find((user) => user.id === id);
      if (uid) return uid.uid;
    }
  };

  //modal
  const { showMembers, setShowMembers } = props;

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowMembers(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showMembers) {
        setShowMembers(false);
      }
    },
    [setShowMembers, showMembers]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const dateFormat = (date) => {
    const createdDate = new Date(date);
    const month = createdDate.toLocaleString("default", { month: "long" });
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    return `${month} ${day}, ${year} `;
  };

  const notAvail = () => {
    alert("Feature is not yet available");
  };

  return (
    <>
      {showMembers ? (
        <div
          className="ch-details-background"
          onClick={closeModal}
          ref={modalRef}
        >
          <div>
            <div className="ch-details-modal-wrapper">
              <div className="ch-details-modal-content">
                <div className="channel-member-details">
                  <div className="channel-member-header">
                    <div className="channel-title">
                      <MdLock style={{ fontSize: "1rem" }} />
                      <span className="ch-name">{channelDetails.name}</span>
                    </div>
                    <div className="ch-details-placeholder">
                      <button
                        type="submit"
                        className="ch-ph-button"
                        onClick={notAvail}
                      >
                        <BiStar />
                        <BiChevronDown />
                      </button>
                      <button
                        type="submit"
                        className="ch-ph-button"
                        onClick={notAvail}
                      >
                        <BiBell /> Get Notification for @ Mentions{" "}
                        <BiChevronDown />
                      </button>
                      <button
                        type="submit"
                        className="ch-ph-button"
                        onClick={notAvail}
                      >
                        <BiPhone /> Start a Call
                      </button>
                    </div>
                  </div>
                  <div className="ch-details-container">
                    <div className="ch-about">About</div>
                    <div className="all-ch-details">
                      <ChannelDetails topic="Topic" subtopic="Add a topic" />
                      <ChannelDetails
                        topic="Description"
                        subtopic="Add a description"
                      />
                      <div className="ch-about-details-1">
                        <div className="created-by-label">Created by</div>
                        <div className="created-by-sub-label">
                          {getUid(channelDetails.owner_id)} on{" "}
                          {dateFormat(channelDetails.created_at)}
                        </div>
                      </div>
                    </div>
                    <h2 className="ch-about">Channel Members</h2>
                    <div className="display-channel-members">
                      {" "}
                      {displayChannelMembers}
                    </div>
                  </div>
                  <MdClose
                    className="close-modal-button"
                    aria-label="Close modal"
                    onClick={() => setShowMembers((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : null}
    </>
  );
}

export default ShowChannelMembers;
