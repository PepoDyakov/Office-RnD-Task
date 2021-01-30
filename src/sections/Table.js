import TableContent from "../components/table/TableContent";
import TableFilters from "../components/table/TableFilters";

import "../styles/sections/Table.scss";

export default function Table(props) {
    return (
        <div className="table-container">
            <TableFilters />
            <TableContent />
        </div>
    );
}
