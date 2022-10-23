import "../Css/App.css"

import SearchBox from "../Components/SearchBox";
import IconsGroup from "../Components/IconsGroup";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate()

  const authCompletion = () => {
    navigate("/playlist")
  }

  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<IconsGroup authCompletion={authCompletion}/>} />
          <Route path="/playlist" element={<SearchBox/>} />
        </Routes>
    </div>
  );
}

export default App;

