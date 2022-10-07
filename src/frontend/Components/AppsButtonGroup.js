import { requestAuthSpotify } from "../../backend/app"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function AppsButtonGroup() {
  return (
    <ButtonGroup aria-label="Basic example" className="centered">
      <Button variant="secondary" onClick={requestAuthSpotify}>Spotify</Button>
      <Button variant="secondary">Deezer</Button>
      <Button variant="secondary">Apple Music</Button>
    </ButtonGroup>
  );
}

export default AppsButtonGroup;