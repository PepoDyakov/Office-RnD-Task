import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../App";

import SortArrowUp from "../../assets/sort-arrow-up.svg";
import SortArrowDown from "../../assets/sort-arrow-down.svg";

import "../../styles/components/table/TableHeader.scss";

const TableHeader = observer((props) => {
    const store = useContext(Context);

    return (
        <thead className="table-header">
            <tr className="table-header-row table-filters">
                <td className="table-cell">
                    <input
                        type="checkbox"
                        checked={store.allMembersSelected()}
                        onChange={(ev) => store.selectAllMembers(ev)}
                        className="row-selector row-selector-all"
                    />
                </td>
                <td className="table-cell">Member</td>
                <td className="table-cell">Team</td>
                <td className="table-cell">Status/Label</td>
                <td
                    className="table-cell sort-cell"
                    order={store.state.tableFilters.order}
                    onClick={(ev) => store.toggleSortMembers(ev)}
                >
                    Created At
                    <div
                        className={`sort-arrow-wrapper ${
                            store.state.tableFilters.order === "asc"
                                ? "sort-asc"
                                : "sort-desc"
                        }`}
                    >
                        <img
                            src={SortArrowUp}
                            alt="Sort arrow ascending"
                            className="sort-arrow"
                        />
                        <img
                            src={SortArrowDown}
                            alt="Sort arrow descending"
                            className="sort-arrow"
                        />
                    </div>
                </td>
                <td className="table-cell">Location</td>
            </tr>
        </thead>
    );
});

export default TableHeader;
