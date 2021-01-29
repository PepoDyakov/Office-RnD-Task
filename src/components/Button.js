import classNames from "classnames";

import "../styles/components/Button.scss";

export default function Button(props) {
    var buttonContainerClasses = classNames("button-container", {
        danger: !!props.danger,
    });

    return (
        <div className={buttonContainerClasses}>
            <p className="button-text">{props.children}</p>
        </div>
    );
}
