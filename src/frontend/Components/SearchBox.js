import "../Css/SearchBox.css"

const SearchBox = ({ color }) => {
    var isActive = false
    var style = {
        background: color,
        color: "#fff"
    }
    const clickOnMusicIcon = () => {
        const searchBox = document.querySelector(".search-box");
        const searchBtn = document.querySelector(".search-icon");
        const searchInput = document.querySelector("input");
        isActive = !isActive
        if (isActive) {
            style = {
                background: color,
                color: "#fff"
            }
            searchBox.classList.add("active");
            searchBtn.classList.add("active");
            searchInput.classList.add("active");
        } else {
            style = {
                background: "#fff",
                color
            }
            searchBox.classList.remove("active");
            searchBtn.classList.remove("active");
            searchInput.classList.remove("active");
        }
        searchInput.focus()
    }

    return (
        <div className="search-box" style={style}>
            <input type="text" placeholder="Type to search.." />
            <div className="search-icon" onClick={clickOnMusicIcon}>
                <i className="fas fa-music"></i>
            </div>
            <div className="search-data">
            </div>
        </div>
    )
}

export default SearchBox