import React, {useState, useEffect, useCallback} from 'react';

// API
import * as UserAPI from '../../UserAPI.js';

// Helpers
import Headers from '../../Helpers/Headers';

// Components
import SearchResults from './SearchResults.js';
import Msg from '../Messages/Msg.js';

// CSS
import styles from './searchbar.module.css';

// Icons
import { BiSearch } from "react-icons/bi";

const SearchBar = (props) => {

    // Props
    const {
        userDB,
        setUserDB,
        placeholder,
        setChatWith,
        setNewMember,
        onAddMember,
        searchFor
    } = props;

    /* State Management */
    const [header] = useState(Headers);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [errors, setErrors] = useState(false);

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
        // setting interval
        const showMsgTimer = setInterval(() => {
            setResponseMsg("");
        }, 5000);

        return () => {
            clearInterval(showMsgTimer);
        };
    },[responseMsg]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    },[handleClick]);

    useEffect(() => {
        if (header["access-token"] === undefined) return;

        if (userDB[0] === undefined) {
          alert("still loading db");
          return;
        }
        
        setSearchSuggestions(
          userDB.filter((user) => user.uid.includes(searchEntry))
        );
    },[searchEntry, userDB, header]);

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
    }

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
                searchFor === 'AddMembers' ? 
                styles.add_member_form_container : 
                styles.input_and_button_wrapper
            }
        >

            {/* Search Container */}
            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <form
                        className={styles.form_searchbar}
                        onSubmit={
                            searchFor === "AddMembers" ? 
                            onAddMember : handleSubmit
                        }
                    >
                        <input
                            type="text"
                            placeholder="Search for members"
                            onChange={(e) => {
                                e.target.value !== "" ? setIsActive(true) : setIsActive(false);
                                setSearchEntry(e.target.value);
                                if (searchFor === "AddMembers") 
                                    setNewMember(e.target.value);
                            }}
                            onFocus={(e) => {
                                getAllUsers();
                                e.target.value !== "" ? setIsActive(true) : setIsActive(false);
                            }}
                            className={
                                searchFor === "AddMembers" ? 
                                styles.input_add : 
                                styles.input_search
                            }
                            value={searchEntry}
                        />
                    </form>
                </div>

                <div className={styles.searchActive}>
                    {isActive ? (
                        <div
                            className={
                                searchFor === 'AddMembers' ?
                                styles.add_mem_sug : 
                                styles.suggestions
                            }
                            onClick={(e) => {
                                setIsActive(false);
                            }}
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
                    searchFor === 'AddMembers' ?
                    styles.searchBtn : 
                    styles.headerBtn
                }
                onClick={
                    searchFor === 'AddMembers' ? 
                    onAddMember : handleSubmit
                }
            >
                {searchFor === 'AddMembers' ? 'Add Member' : <BiSearch />}
            </button>

            {responseMsg && 
                <Msg 
                    error={errors} 
                    message={responseMsg} 
                />
            }
        </div>
    )
}

export default SearchBar;