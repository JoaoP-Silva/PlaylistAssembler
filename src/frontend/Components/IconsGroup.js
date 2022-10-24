import spotifyLogo from "../Media/spotifyLogo.png"
import deezerLogo from "../Media/deezerLogo.png"
import napsterMusicLogo from "../Media/napsterLogo.png"
import "../Css/IconsGroup.css"
import { Container, Row, Col } from "react-bootstrap"
import { requestAuthSpotify } from "../../backend/app"
import { requestAuthNapster } from "../../backend/app"

const IconsGroup = ({authCompletion}) => {

    const spotifyCompletion = (token) => {
        authCompletion(token)
    }
    
    return (
        <Container className="icon-group">
            <Row className="justify-content-md-center">
                <Col><img className="icon-logo" src={spotifyLogo} alt="spotify-logo" onMouseUp={() => requestAuthSpotify(spotifyCompletion)}></img></Col>
                <Col><img className="icon-logo" src={deezerLogo} alt="deezer-logo" onMouseUp={() => requestAuthSpotify(spotifyCompletion)}></img></Col>
                <Col><img className="icon-logo" src={napsterMusicLogo} alt="napster-logo" onMouseDown={() => requestAuthNapster(spotifyCompletion)}></img></Col>
            </Row>
        </Container>
    )
}

export default IconsGroup
