import { useState } from "react";
import Input from "./Input";
import TextField from "./TextField";
import "../Css/SearchBox.css"

const SearchBox = ({ callback }) => {
    let [isInput, setIsInput] = useState(true)
    let [playlistName, setPlayListName] = useState("")

    const changePlaylistName = (newPlaylistName) => {
        setPlayListName(newPlaylistName)
    }

    const enterPressedCallBack = () => {
        setIsInput(!isInput)
    }

    const makeInput = () =>  isInput ?
     <Input playlistNameCallBack={changePlaylistName} enterPressedCallBack={enterPressedCallBack}/>:
     <TextField/>

    return (
        <div>
            <h1 className="search-box-h1">{playlistName}</h1>
            {makeInput()}
        </div>
    )
}

export default SearchBox