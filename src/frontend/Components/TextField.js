import "../Css/TextField.css"

const TextField = () => {

    const runPlaylist = () => {
        const songs = document.querySelector("textarea").value.split("\n")
        console.log(songs)
    }

    return (<div className="text-field-div">
            <textarea className="text-field" autoFocus={true} />
            <button className="text-field-button" onClick={() => runPlaylist()}>RUN</button>
    </div>)
}
export default TextField