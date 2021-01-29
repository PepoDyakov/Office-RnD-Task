import Button from "../components/Button";
import Filter from "../components/Filter";

import "../styles/sections/FiltersList.scss";

export default function FiltersList(props) {
    return (
        <div className="filters-container">
            <ul className="filters-list">
                <Filter>All</Filter>
                <Filter>Lead</Filter>
                <Filter active>Drop-in</Filter>
                <Filter>Active</Filter>
                <Filter>Former</Filter>
            </ul>
            <div className="actions">
                <Button danger>Delete</Button>
                <Button>Add Member</Button>
            </div>
        </div>
    );
}
