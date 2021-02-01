import classNames from "classnames";
import "../styles/components/Filter.scss";

const Filter = (props) => {
    let filterClassNames = classNames("filter", {
        selected: !!props.selected,
    });

    return (
        <li
            className={filterClassNames}
            name={props.name}
            onClick={(event) => props.onClick(event)}
        >
            {props.children}{" "}
            <p
                className="filter-number"
                onClick={(ev) => {
                    ev.stopPropagation();
                }}
            >
                {props.count}
            </p>
            <div className="filter-marker"></div>
        </li>
    );
};

export default Filter;
