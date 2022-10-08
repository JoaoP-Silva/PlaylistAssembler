import { useState } from "react";
import "../Css/SearchBox.css"

const SearchBox = ({ callback }) => {
    let [placeholder, setPlaceHolder] = useState("Type playlist name...")
    let [style, setStyle] = useState({ color: "#1DB954", background: "fff" })
    let [active, setActive] = useState("")
    let debounceTimer;
    var songsArray = []

    const logDebounceResult = () => {
        if (placeholder === "Type playlist name...") {
            callback(document.querySelector("input").value)
        }
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

    const finishInput = (element) => {
        const searchInput = document.querySelector("input");
        element = element || window.event;
        if (element.keyCode === 13) {
            if (placeholder === "Type playlist name...") {
                callback(document.querySelector("input").value)
            } else {
                songsArray.push(searchInput.value)
            }
            searchInput.value = ""
            searchInput.focus()
            setPlaceHolder("List the songs you want...")
            console.log(songsArray)
        }
    }

    return (
        <div className={`search-box ${active}`}>
            <input
                type="text"
                placeholder= {placeholder}
                onChange={() => debounce(logDebounceResult, 50)}
                className={`${active}`}
                onKeyDown={() => finishInput(this)} />
            <div className={`search-icon ${active}`} onClick={clickOnMusicIcon} style={style}>
                <i className="fas fa-music"></i>
            </div>
        </div>
    )
}

export default SearchBox