import React, { useState, useCallback, useEffect } from "react";

// API
import * as UserAPI from "../../UserAPI";

// Helpers
import Headers from "../../Helpers/Headers";

// Components
import SearchResults from "./SearchResults.js";
import Msg from "../Messages/Msg.js";

// CSS
import "./searchbar.css";

// Icons
import { BiSearch } from "react-icons/bi";

const SearchBar = (props) => {

    // Props
    const {
        setChatWith,
        userDB,
        setUserDB,
        searchBarFor,
        onAddMember,
        setNewMember,
    } = props;

    /* State Management */
    const [header] = useState(Headers);
    const [searchEntry, setSearchEntry] = useState("");
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
        if (header["access-token"] === undefined) return;
        if (userDB[0] === undefined) {
        alert("still loading db");
        return;
        }
        setSearchSuggestions(
        userDB.filter((user) => user.uid.includes(searchEntry))
        );
    }, [searchEntry, userDB, header]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userDB[0] === undefined) 
            return;
        if (e.target.textContent == null) 
            return;

        let found = userDB.find((user) => user.uid === searchEntry);

        if (found === undefined) {
            setErrors(true);
            setResponseMsg("");
            setResponseMsg("No users with that ID!");
        } 
        else {
            setResponseMsg("");
            setErrors(false);
            setChatWith(found);
            setIsActive(false);
        }
    };

    const getAllUsers = () => {
        UserAPI.listUsers(header)
        .then((res) => {
            setUserDB(res.data.data);
        })
        .catch((e) => {
            console.log("Failed to get all users");
        });
    };

    let suggestions = searchSuggestions
        ? searchSuggestions.map((user) => {
            return (
            <SearchResults
                key={user.id}
                user={user}
                setSearchEntry={setSearchEntry}
                handleSubmit={handleSubmit}
                setNewMember={setNewMember}
            />
            );
        })
    : null;

    return (
        <div
            className={
                searchBarFor === "AddMembers"
                ? "add-member-form-container"
                : "input-and-button-wrapper"
            }
        >

            {/* Search Container */}
            <div className="container-search">
                <div className="searchBar">
                
                {/* Form */}
                <form
                    className="form-searchbar"
                    onSubmit={
                        searchBarFor === "AddMembers" ? 
                        onAddMember : handleSubmit
                    }
                >
                    <input
                        type="text"
                        placeholder="Search for members"
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
                            searchBarFor === "AddMembers" ? 
                            "input-search-add-members" : 
                            "input-search"
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
                                searchBarFor === "AddMembers" ?
                                "add-mem-suggestion" : 
                                "Suggestions"
                            }
                        >
                            {suggestions}
                        </div>
                    ) : null}
                </div>
                
            </div>

            {/* Button */}
            <button
                type="submit"
                className={
                    searchBarFor === "AddMembers" ? 
                    "search-add-member-btn" : 
                    "header-btn"
                }
                onClick={
                    searchBarFor === "AddMembers" 
                    ? onAddMember : 
                    handleSubmit
                }
            >
                {searchBarFor === "AddMembers" ? "Add member" : <BiSearch />}
            </button>

            {responseMsg && 
                <Msg 
                    error={errors} 
                    message={responseMsg} 
                />
            }
        </div>
    );
}

export default SearchBar;
