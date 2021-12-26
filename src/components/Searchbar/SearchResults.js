import React from 'react';

// CSS
import styles from './searchresults.module.css';

const SearchResults = (props) => {

    // Props
    const {
        user,
        setSearchEntry,
        handleSubmit,
        setNewMember
    } = props;

    const isAvailable = user !== undefined ? true : false;

    return (
        <div 
            className={styles.searchResults}
            onClick={(e) => {
                setSearchEntry(e.target.textContent);
                if (setNewMember) {
                    setNewMember(e.target.textContent);
                }
            }}
        >
            {isAvailable && user.uid}
        </div>
    )
}

export default SearchResults;