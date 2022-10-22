import spotifyLogo from "../Media/spotifyLogo.png"
import deezerLogo from "../Media/deezerLogo.png"
import appleMusicLogo from "../Media/appleMusicLogo.png"
import "../Css/IconsGroup.css"
import { Container, Row, Col } from "react-bootstrap"
import { requestAuthSpotify } from "../../backend/app"
const IconsGroup = () => {

    const spotifyClick = () => {
        requestAuthSpotify()
    }

    return (
        <Container className="icon-group">
            <Row className="justify-content-md-center">
                <Col><img className="icon-logo" src={spotifyLogo} alt="spotify-logo" onMouseUp={ () => spotifyClick()}></img></Col>
                <Col><img className="icon-logo" src={deezerLogo} alt="spotify-logo" onMouseUp={() => spotifyClick()}></img></Col>
                <Col><img className="icon-logo" src={appleMusicLogo} alt="spotify-logo" onMouseDown={() => spotifyClick()}></img></Col>
            </Row>
        </Container>
    )
}

export default IconsGroup