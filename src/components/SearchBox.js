import SearchIcon from "../assets/search-icon.png";

import "../styles/components/SearchBox.scss";

export default function SearchBox(props) {
    return (
        <div className="search-box-container">
            <img className="search-icon" src={SearchIcon} alt="search icon" />
            <input type="text" className="search-box-input" />
        </div>
    );
}
