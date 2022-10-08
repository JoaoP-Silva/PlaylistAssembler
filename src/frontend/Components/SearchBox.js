import { useState } from "react";
import "../Css/SearchBox.css"

const SearchBox = () => {
    let [style, setStyle] = useState({ color: "#1DB954", background: "fff" })
    let [active, setActive] = useState("")
    let debounceTimer;

    const logDebounceResult = () => {
        console.log(document.querySelector("input").value)
    }

    const debounce = (callback, time) => {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(callback, time);
    };

    const clickOnMusicIcon = () => {
        const searchInput = document.querySelector("input");
        if (active.length === 0) {
            setActive("active")
            setStyle({
                background: "#1DB954",
                color: "#fff"
            })
        } else {
            setActive("")
            setStyle({
                background: "#fff",
                color: "#1DB954"
            })
        }
        searchInput.focus();
    }

    return (
        <div className={`search-box ${active}`}>
            <input type="text" placeholder="Type to search.." onChange={() => debounce(logDebounceResult, 1000)} className={`${active}`}/>
            <div className={`search-icon ${active}`} onClick={clickOnMusicIcon} style={style}>
                <i className="fas fa-music"></i>
            </div>
        </div>
    )
}

export default SearchBox