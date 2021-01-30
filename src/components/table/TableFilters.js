import DropdownFilter from "../DropdownFilter";
import SearchBox from "../SearchBox";

import "../../styles/components/table/TableFilters.scss";

const initialState = {
    isListOpen: false,
    selectedOption: {
        id: -1,
        title: "All",
    },
    locations: [
        {
            id: 0,
            title: "New York",
            key: "location",
        },
        {
            id: 1,
            title: "Dublin",
            key: "location",
        },
        {
            id: 2,
            title: "California",
            key: "location",
        },
        {
            id: 3,
            title: "Istanbul",
            key: "location",
        },
        {
            id: 4,
            title: "Izmir",
            key: "location",
        },
        {
            id: 5,
            title: "Oslo",
            key: "location",
        },
    ],
};

export default function TableFilters(props) {
    return (
        <div className="table-fitlers-container">
            <div className="table-filters-actions">
                <SearchBox />
                <DropdownFilter placeholder="Location" selection="London HQ" />
                <DropdownFilter placeholder="Company" selection="All" />
            </div>
            <div className="search-results">
                <b>4</b> results (of total <b>36</b>)
            </div>
        </div>
    );
}
