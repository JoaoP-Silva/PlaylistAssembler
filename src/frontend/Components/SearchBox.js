import { useState } from "react";
import Input from "./Input";
import TextField from "./TextField";
import "../Css/SearchBox.css"

const SearchBox = ({ createPlaylistCompletion }) => {
    let [isInput, setIsInput] = useState(true)
    let [playlistName, setPlayListName] = useState("")

    const changePlaylistName = (newPlaylistName) => {
        setPlayListName(newPlaylistName)
    }

    const enterPressedCallBack = () => {
        setIsInput(!isInput)
    }

    const textFieldCompletion = (songs) => {
        createPlaylistCompletion(playlistName, songs)
    }

    const makeInput = () =>  isInput ?
     <Input playlistNameCallBack={changePlaylistName} enterPressedCallBack={enterPressedCallBack}/>:
     <TextField textFieldCompletion={textFieldCompletion}/>

    return (
        <div>
            <h1 className="search-box-h1">{playlistName}</h1>
            {makeInput()}
        </div>
    )
}

export default SearchBox