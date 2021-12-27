import React, { useState, useCallback, useEffect } from "react";

// API
import * as UserAPI from "../../../UserAPI";

// Helpers
import Headers from "../../../Helpers/Headers";

// Components
import SearchResult from "./SearchResult";
import ErrMsg from "../ErrorMsg/ErrMsg.js";

// CSS
import "./styles/searchbar.css";

// Icons
import { BiSearch } from "react-icons/bi";

const SearchBar = (props) => {

    // Props
    const {
      placeholder,
      setChatWith,
      userDb,
      setUserDb,
      searchBarFor,
      onAddMember,
      setNewMember,
    } = props;

    /* State Management */
    const [searchEntry, setSearchEntry] = useState("");
    const [header] = useState(Headers);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    // useCallback
    const handleClick = useCallback(
      (e) => {
        let cl = e.target.classList;
        if (cl.contains("input-search") || cl.contains("result")) {
        } else {
          setIsActive(false);
        }
      },
      [setIsActive]
    );

    /* useEffect */
    useEffect(() => {
      const showMsgTimer = setInterval(() => {
        setResponseMsg("");
      }, 5000);
      return () => {
        clearInterval(showMsgTimer);
      };
    }, [responseMsg]);

    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, [handleClick]);

    useEffect(() => {
      if (header["access-token"] === undefined) 
        return;
      if (userDb[0] === undefined) {
        alert("still loading db");
        return;
      }
      setSearchSuggestions(
        userDb.filter((user) => user.uid.includes(searchEntry))
      );
    }, [searchEntry, userDb, header]);

    const submitHandler = (e) => {
      e.preventDefault();
      if (userDb[0] === undefined) 
        return;
      if (e.target.textContent == null) 
        return;

      let found = userDb.find((user) => user.uid === searchEntry);

      if (found === undefined) {
        setErrors(true);
        setResponseMsg("");
        setResponseMsg("No users with that ID!");
      } else {
        setResponseMsg("");
        setErrors(false);
        setChatWith(found);
        setIsActive(false);
      }
    };

    const getAllUsers = () => {
      UserAPI.listUsers(header)
        .then((res) => {
          setUserDb(res.data.data);
        })
        .catch((e) => {
          console.log("Failed to get all users");
        });
    };

    let suggestions = searchSuggestions
      ? searchSuggestions.map((user) => {
          return (
            <SearchResult
              key={user.id}
              user={user}
              setSearchEntry={setSearchEntry}
              submitHandler={submitHandler}
              setNewMember={setNewMember}
            />
          );
        })
    : null;

    return (
      <div
          className={
            searchBarFor === "AddMembers" ? 
            "add-member-form-container" : 
            "input-and-button-wrapper"
          }
      >

        {/* Search Container */}
        <div className="container-search">
          <div className="searchBar">

            {/* Form */}
            <form
              onSubmit={
                searchBarFor === "AddMembers" ? 
                onAddMember : submitHandler
              }
              className="form-searchbar"
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => {
                      e.target.value !== "" ? setIsActive(true) : setIsActive(false);
                      setSearchEntry(e.target.value);
                      if (searchBarFor === "AddMembers") 
                        setNewMember(e.target.value);
                    }}
                    onFocus={(e) => {
                      getAllUsers();
                      e.target.value !== "" ? setIsActive(true) : setIsActive(false);
                    }}
                    className={
                      searchBarFor === "AddMembers"
                        ? "input-search-add-members"
                        : "input-search"
                    }
                    value={searchEntry}
                />
            </form>

          </div>

          <div>
              {isActive ? (
                <div
                  onClick={(e) => {
                    setIsActive(false);
                  }}
                  className={
                    searchBarFor === "AddMembers"
                      ? "add-mem-suggestion"
                      : "suggestions"
                  }
                >
                  {suggestions}
                </div>
            ) : null}
          </div>

        </div>

        <button
          type="submit"
          className={
            searchBarFor === "AddMembers" ? 
            "search-add-member-btn" : 
            "header-btn"
          }
          onClick={
            searchBarFor === "AddMembers" ? 
            onAddMember : submitHandler
          }
        >
          {searchBarFor === "AddMembers" ? "Add member" : <BiSearch />}
        </button>

        {responseMsg && 
            <ErrMsg 
              error={errors} 
              message={responseMsg} 
            />
        }
      </div>
    );
}

export default SearchBar;