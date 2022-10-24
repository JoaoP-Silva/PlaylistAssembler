import { useNavigate, useSearchParams } from "react-router-dom"
import "../Css/Error.css"
import { Button } from "react-bootstrap";

const Error = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    return (<div className="error-div">
            <h1 className="error-h1">{searchParams.get("message")}</h1>
            <Button variant="danger" className="error-button" onClick={() => navigate("/")}>Try again by clicking here</Button>
        </div>)
}

export default Error