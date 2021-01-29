import classNames from "classnames";
import "../styles/components/Filter.scss";

export default function Filter(props) {
    let filterClassNames = classNames("filter", {
        "filter-active": !!props.active,
    });

    return (
        <li className={filterClassNames}>
            {props.children} <p className="filter-number">10</p>
            <div className="filter-marker"></div>
        </li>
    );
}
