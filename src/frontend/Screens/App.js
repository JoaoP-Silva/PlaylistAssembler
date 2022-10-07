import { Container } from "react-bootstrap";
import "../Css/App.css"
import SearchBox from "../Components/SearchBox";

function App() {
  const color = "#1DB954"
  return (
    <div className="app">
      <SearchBox color = {color}></SearchBox>
    </div>
  );
}

export default App;

