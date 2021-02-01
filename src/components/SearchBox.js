import SearchIcon from "../assets/search-icon.png";

import "../styles/components/SearchBox.scss";

const SearchBox = (props) => {
    return (
        <div className="search-box-container">
            <img className="search-icon" src={SearchIcon} alt="search icon" />
            <input
                type="text"
                className="search-box-input"
                value={props.inputValue}
                onChange={props.onChange}
            />
        </div>
    );
};

export default SearchBox;
