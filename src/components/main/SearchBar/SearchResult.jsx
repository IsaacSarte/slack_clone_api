import React from "react";
import Avatar from "../../Avatar/Avatar";

// CSS
import "./styles/searchresult.css";

const SearchResult = (props) => {

  // Props
  const { user, setSearchEntry, setNewMember } = props;

  const isAvailable = user !== undefined ? true : false;

  return (
    <div
      className="result"
      onClick={(e) => {
        setSearchEntry(e.target.textContent);
        if (setNewMember) setNewMember(e.target.textContent);
      }}
    >
      {isAvailable && <Avatar user={user} size={30} />}
      {isAvailable && user.uid}
    </div>
  );
}

export default SearchResult;