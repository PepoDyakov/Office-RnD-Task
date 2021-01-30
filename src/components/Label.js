import classNames from "classnames";

import "../styles/components/Label.scss";

export default function Label(props) {
    let additionalClasses = classNames({
        active: !!props.active,
    });
    return (
        <div className={`label-container ${additionalClasses}`}>
            <p className="label-text">{props.children}</p>
        </div>
    );
}
