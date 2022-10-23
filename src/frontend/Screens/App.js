import "../Css/App.css"

import SearchBox from "../Components/SearchBox";
import IconsGroup from "../Components/IconsGroup";
import Error from "../Components/Error"

import { Routes, Route, useNavigate } from "react-router-dom";
import { createPlaylist } from "../../backend/app";
import Success from "../Components/Success";

function App() {

  const navigate = useNavigate()

  const authCompletion = () => {
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
          <Route path="/error" element={<Error></Error>}/>
          <Route path="/success" element={<Success></Success>}/>
        </Routes>
    </div>
  );
}

export default App;

