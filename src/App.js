import FiltersList from "./sections/FiltersList";
import Table from "./sections/Table";

import "./styles/App.scss";

export default function App() {
    return (
        <div className="App">
            <FiltersList />
            <Table />
        </div>
    );
}
