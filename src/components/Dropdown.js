import { observer } from "mobx-react-lite";

import DropdownArrow from "../assets/arrow.svg";
import FormDropdownArrow from "../assets/form-dropdown-arrow.png";

import "../styles/components/Dropdown.scss";

const Dropdown = observer((props) => {
    return (
        <div className="dropdown-container">
            {props.children && (
                <label className="dropdown-label">{props.children}</label>
            )}
            <div
                className={`dropdown-select-wrapper ${
                    props.formDropdown ? "form" : ""
                }`}
            >
                {props.label && (
                    <label className="side-label">{props.label}</label>
                )}
                <select
                    name={props.name}
                    onChange={(ev) => props.handleChange(ev)}
                    className="dropdown-select"
                    defaultValue={-1}
                >
                    <option key={-1} value="all">
                        {props.placeholder}
                    </option>
                    {props.list.map((item) => {
                        return (
                            <option
                                key={`${props.name} + ${item._id}`}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <img
                    src={props.form ? FormDropdownArrow : DropdownArrow}
                    alt="arrow"
                    className="dropdown-icon"
                />
            </div>
        </div>
    );
});

export default Dropdown;
