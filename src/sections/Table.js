import { observer } from "mobx-react-lite";
import { useContext } from "react";

import { Context } from "../App";

import TableContent from "../components/table/TableContent";
import TableFilters from "../components/table/TableFilters";

import "../styles/sections/Table.scss";

const Table = observer((props) => {
    const store = useContext(Context);

    if (store.state.isLoading === true) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="table-container">
                <TableFilters />
                <TableContent members={store.state.filteredMembers} />
            </div>
        );
    }
});

export default Table;
