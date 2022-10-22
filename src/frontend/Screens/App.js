import "../Css/App.css"
import SearchBox from "../Components/SearchBox";
import { useState } from "react";
import IconsGroup from "../Components/IconsGroup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [playlistName, setPlayListName] = useState("")
  const searchBoxCallBack = (data) => {
    setPlayListName(data)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< IconsGroup/>} />
          <Route path="/playlist" element={<SearchBox />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

