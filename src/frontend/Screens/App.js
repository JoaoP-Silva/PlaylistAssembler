import "../Css/App.css"
import SearchBox from "../Components/SearchBox";
import { useState } from "react";

function App() {
  let [playlistName, setPlayListName] = useState("")
  const searchBoxCallBack = (data) => {
    setPlayListName(data)
  }

  return (
    <div className="app">
      <h1 className="playlistName">{playlistName}</h1>
      <SearchBox callback = {searchBoxCallBack}></SearchBox>
    </div>
  );
}

export default App;

