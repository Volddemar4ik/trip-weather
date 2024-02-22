import React from "react";
import './style.css'

export default function Search(props) {
    const { handleChangeSearchText, handleSearchText } = props

    return (
        <div className="search">
            <input
                name="search"
                id="search"
                type="text"
                placeholder='Search...'
                value={handleSearchText}
                onChange={handleChangeSearchText}
            />
        </div>
    )
}