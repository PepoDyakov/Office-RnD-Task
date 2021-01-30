import DropdownArrow from "../assets/arrow.png";

import "../styles/components/DropdownFilter.scss";

export default function DropdownFilter(props) {
    return (
        <div className="dropdown-container">
            <div
                className="dropdown-inner"
                onClick={() => props.toggleDropdown()}
            >
                <p className="dropdown-placeholder">{props.placeholder}:</p>
                <p className="dropdown-selection">
                    {props.state.selectedOption.title}
                </p>
                <img
                    className="dropdown-arrow"
                    src={DropdownArrow}
                    alt="arrow"
                />
            </div>
            {props.state.isListOpen && (
                <div className="dropdown-list">
                    {props.state.locations.map((location) => {
                        return (
                            <button
                                className="dropdown-list-item"
                                key={location.id}
                                onClick={() => props.handleChange(location)}
                            >
                                {location.title}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
