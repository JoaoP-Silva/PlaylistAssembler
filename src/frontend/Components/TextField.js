import "../Css/TextField.css"

const TextField = ({ }) => {
    return (<div className="text-field-div">
            <textarea className="text-field" onFocus={true} />
            <button className="text-field-button">RUN</button>
    </div>)
}
export default TextField