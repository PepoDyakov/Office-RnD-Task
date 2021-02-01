import classNames from "classnames";

import "../styles/components/Button.scss";

export default function Button(props) {
    var buttonContainerClasses = classNames({
        action: !!props.action,
        danger: !!props.danger,
    });

    return (
        <button
            type={props.type}
            form={props.form}
            className={`button-container ${buttonContainerClasses}`}
            onClick={props.onClick}
        >
            <p className="button-text">{props.children}</p>
        </button>
    );
}
