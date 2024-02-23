import React from "react";
import './style.css'

export default function Header() {

    return (
        <div className="header">
            <p>Mr. James Smith</p>

            <div className="header__avatar">
                <span className="material-symbols-outlined">
                    person
                </span>
            </div>
        </div>
    )
}