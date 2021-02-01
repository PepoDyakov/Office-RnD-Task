import CalendarIcon from "../assets/calendar.png";

import "../styles/components/FormInput.scss";

const FormInput = (props) => {
    return (
        <div className="input-container">
            <label className="input-label">{props.children}</label>
            <div className="input-wrapper">
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    className="input"
                    name={props.name}
                    value={props.value}
                    onChange={(event) => {
                        props.handleChange(event);
                    }}
                />
                {props.type === "date" && (
                    <img
                        src={CalendarIcon}
                        alt="calendar"
                        className="calendar-icon"
                    />
                )}
            </div>
        </div>
    );
};

export default FormInput;
