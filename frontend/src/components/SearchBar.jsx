import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';


function SearchBar({onSearch}) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        //console.log(query);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        onSearch(query) //the query is now set for onSearch passed by WeatherApp.jsx
        setQuery(''); 
    };
    return (
        <Wrapper>
            <SearchBarMain onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                />
                <SearchButton type="submit" onClick={handleSearch}>Search</SearchButton>
            </SearchBarMain>
        </Wrapper>
    )
}

const Wrapper= styled.div`
    display: flex;
`
const SearchBarMain = styled.div`
    display: flex;
    flex: 1;
`
const SearchInput = styled.input`
    flex: 1;
    padding: 8px 12px;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    background-color: rgba(104, 91, 126, 0.3);

    /* Add the frosted glass blur effect */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* for Safari support */
    border: none;
    
    &:focus {
        outline: none;
        border-color: #007BFF;
    }
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    color: white;
    background-color: #2e2142;;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 16px;
    border:none;
    border-left:1px solid gray;
    
    &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
    &:focus {
        outline: none;
    }
`;

export default SearchBar;