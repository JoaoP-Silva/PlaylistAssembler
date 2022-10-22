import { useState } from "react";
import "../Css/Input.css"

const Input = ( { playlistNameCallBack, enterPressedCallBack } ) => {

    const PLACEHOLDER = "Set the playlist name"

    let [style, setStyle] = useState({ color: "#FFFFFF", background: "#1DB954" })
    let [active, setActive] = useState("active")

    const clickOnMusicIcon = () => {
        const searchInput = document.querySelector("input");
        if (active.length === 0) {
            setActive("active")
            setStyle({
                background: "#1DB954",
                color: "#FFFFFF"
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
        element = element || window.event;
        if (element.keyCode === 13) {
            enterPressedCallBack()
        }
    }

    const changePlaylistName = (event) => {
        const searchInput = document.querySelector("input");
        playlistNameCallBack(searchInput.value)
        console.log(event, searchInput.value)
    }

    return (<div className={`search-box ${active}`}>
        <input
            type="text"
            placeholder={PLACEHOLDER}
            onChange={(e) => changePlaylistName(e)}
            className={`${active}`}
            onKeyDown={() => finishInput(this)} />
        <div className={`search-icon ${active}`} onClick={clickOnMusicIcon} style={style}>
            <i className="fas fa-music"></i>
        </div>
    </div>)
}

export default Input