import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../App";
import Button from "../components/Button";
import Filter from "../components/Filter";

import "../styles/sections/FiltersList.scss";

const FiltersList = observer((props) => {
    const store = useContext(Context);

    return (
        <div className="filters-container">
            <ul className="filters-list">
                <Filter
                    count={store.allMembersCount}
                    name="all"
                    onClick={(ev) => store.handleFilterSelect(ev)}
                    selected={store.state.tableFilters.global === "all"}
                >
                    All{" "}
                </Filter>
                <Filter
                    count={store.state.membersCount("lead")}
                    name="lead"
                    onClick={(ev) => store.handleFilterSelect(ev)}
                    selected={store.state.tableFilters.global === "lead"}
                >
                    Lead{" "}
                </Filter>
                <Filter
                    count={store.state.membersCount("drop-in")}
                    name="drop-in"
                    onClick={(ev) => store.handleFilterSelect(ev)}
                    selected={store.state.tableFilters.global === "drop-in"}
                >
                    Drop-in
                </Filter>
                <Filter
                    count={store.state.membersCount("active")}
                    name="active"
                    onClick={(ev) => store.handleFilterSelect(ev)}
                    selected={store.state.tableFilters.global === "active"}
                >
                    Active{" "}
                </Filter>
                <Filter
                    count={store.state.membersCount("former")}
                    name="former"
                    onClick={(ev) => store.handleFilterSelect(ev)}
                    selected={store.state.tableFilters.global === "former"}
                >
                    Former{" "}
                </Filter>
            </ul>
            <div className="actions">
                <Button
                    danger
                    onClick={() => {
                        store.deleteMembers();
                    }}
                >
                    Delete
                </Button>
                <Button action onClick={() => store.openModal()}>
                    Add Member
                </Button>
            </div>
        </div>
    );
});

export default FiltersList;
