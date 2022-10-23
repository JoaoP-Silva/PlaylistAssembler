import "../Css/TextField.css"

const TextField = ({textFieldCompletion}) => {

    const runPlaylist = () => {
        const songs = document.querySelector("textarea").value.split("\n").filter((song) => song.length > 0)
        textFieldCompletion(songs)
    }

    return (<div className="text-field-div">
            <textarea className="text-field" autoFocus={true} />
            <button className="text-field-button" onClick={() => runPlaylist()}>RUN</button>
    </div>)
}
export default TextField