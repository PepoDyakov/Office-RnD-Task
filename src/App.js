import React from "react";

import Modal from "./components/Modal";
import FiltersList from "./sections/FiltersList";
import Table from "./sections/Table";

import store from "./data/Store";

import "./styles/App.scss";

export const Context = React.createContext({});

const App = () => {
    return (
        <Context.Provider value={store}>
            <div className="App">
                <FiltersList />
                <Table />
                <Modal
                    isModalOpen={store.state.isModalOpen}
                    offices={store.state.offices}
                    teams={store.state.teams}
                />
            </div>
        </Context.Provider>
    );
};

export default App;
