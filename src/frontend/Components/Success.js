import { useNavigate, useSearchParams } from "react-router-dom"
import "../Css/Success.css"
import { Button } from "react-bootstrap";

const Success = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    return (<div className="success-div">
            <h1 className="success-h1">{searchParams.get("message")}</h1>
            <Button variant="success" className="success-button" onClick={() => navigate("/")}>Try Another one</Button>
        </div>)
}

export default Success