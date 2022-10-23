import "../Css/App.css"

import SearchBox from "../Components/SearchBox";
import IconsGroup from "../Components/IconsGroup";

import { Routes, Route, useNavigate } from "react-router-dom";
import { createPlaylist } from "../../backend/app";

function App() {

  const navigate = useNavigate()

  const authCompletion = (token) => {
    navigate("/playlist")
  }

  const createPlaylistCompletion = (playlistName, songs) => {
    createPlaylist(playlistName, songs)
  }

  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<IconsGroup authCompletion={authCompletion}/>} />
          <Route path="/playlist" element={<SearchBox createPlaylistCompletion={createPlaylistCompletion}/>} />
        </Routes>
    </div>
  );
}

export default App;

