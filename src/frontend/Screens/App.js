import { onPageLoad, requestAuthSpotify } from "../../backend/app"

function App() {
  return (
    <div className="App" onLoad={onPageLoad()}>
      <h1>PlaylistAssembler</h1>
      <h2>O montador automático de playlists.</h2>
      <p>Digite o título da playlist</p>
      <input type="text" id="plTitle"></input>
      <p><label htmlFor="musicList">Digite as músicas da playlist separadas por quebra de linha</label></p>
      <textarea id="musicList" name="musicList" rows="10" cols="35"></textarea> <br></br>
      <form>
        <input type="button" value="Montar no Spotify" id="spotifyBtn" onClick= {requestAuthSpotify} />
        <input type="button" value="Montar no Deezer" id="deezerBtn" />
        <input type="button" value="Montar no AppleMusic" id="appleBtn" />
      </form>

    </div>
  );
}

export default App;

