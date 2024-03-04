import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchRef = useRef(); // reference to the search box

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchVisible(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            window.location.href = `/item-service/search/${searchTerm}`;
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <div>
            <div className="search-icon" onClick={toggleSearch}>
                <FaSearch size={20} style={{ color: '#999' }} />
            </div>

            {isSearchVisible && (
                <div className="search-input" ref={searchRef}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onKeyPress={handleSearch}
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
