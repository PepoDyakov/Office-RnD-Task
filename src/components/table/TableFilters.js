import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../App";

import Dropdown from "../Dropdown";
import SearchBox from "../SearchBox";

import "../../styles/components/table/TableFilters.scss";

const TableFilters = observer((props) => {
    const store = useContext(Context);
    const { teams, locations, tableFilters } = store.state;

    return (
        <div className="table-fitlers-container">
            <div className="table-filters-actions">
                <SearchBox
                    value={tableFilters.searchValue}
                    onChange={(ev) =>
                        store.handleSearchMembers(ev.target.value)
                    }
                />
                <Dropdown
                    label="Location:"
                    list={locations}
                    name="location"
                    defaultValue={tableFilters.location._id}
                    placeholder="All"
                    handleChange={store.handleInputChange}
                />
                <Dropdown
                    label="Company:"
                    list={teams}
                    name="team"
                    defaultValue={tableFilters.team._id}
                    placeholder="All"
                    handleChange={store.handleInputChange}
                />
            </div>
            <div className="search-results">
                <b>{store.state.filteredMembers.length}</b> results (of total{" "}
                <b>{store.allMembersCount}</b>)
            </div>
        </div>
    );
});

export default TableFilters;
