import axios from "axios";
import {
    action,
    computed,
    makeAutoObservable,
    observable,
    runInAction,
} from "mobx";
import { computedFn } from "mobx-utils";
import formStore from "./FormStore";
import transportLayer from "./transportLayer";

axios.defaults.headers.common["Authorization"] = process.env.REACT_APP_TOKEN;

class Store {
    state = {
        teams: [],
        locations: [],
        members: [],
        isLoading: true,
        isModalOpen: false,
        tableFilters: {
            location: "all",
            team: "all",
            global: "all",
            order: "asc",
            searchValue: "",
        },
        membersCount: computedFn((type) => {
            let membersOfType = this.state.members.filter((member) => {
                return member.calculatedStatus === type;
            });
            return membersOfType.length;
        }),
        selectedMembers: [],
        filteredMembers: [],
    };
    formStore = {};
    transportLayer = {};

    constructor(formStore, transportLayer) {
        makeAutoObservable(this, {
            state: observable,
            formStore: observable,
            openModal: action.bound,
            handleInputChange: action.bound,
            selectMember: action.bound,
            handleSubmitForm: action.bound,
            allMembersCount: computed,
            filterTableRows: action.bound,
            filterByGlobal: action.bound,
            filterByLocation: action.bound,
            filterByTeam: action.bound,
            filterBySearch: action.bound,
            toggleSortMembers: action.bound,
        });
        this.transportLayer = transportLayer;
        this.formStore = formStore;
        this.fetchData();
    }

    async fetchData() {
        let responses = await this.transportLayer.fetchData();
        const teamsResponse = responses[0];
        const locationsResponse = responses[1];
        const membersResponse = responses[2];
        runInAction(() => {
            this.state.teams = [...this.state.teams, ...teamsResponse];
            this.state.locations = [
                ...this.state.locations,
                ...locationsResponse,
            ];
            this.state.members = [...this.state.members, ...membersResponse];
            this.state.isLoading = false;
        });

        this.filterTableRows();
    }

    openModal() {
        this.state.isModalOpen = true;
    }

    closeModal() {
        this.state.isModalOpen = false;
        this.formStore.resetState();
    }

    get allMembersCount() {
        return this.state.members.length;
    }

    get filterKeys() {
        return {
            global: this.state.globalFilter,
            locationID: this.state.tableFilters.location._id,
            teamID: this.state.tableFilters.team._id,
        };
    }

    getTeamName(teamID) {
        let team = this.state.teams.filter((team) => {
            return team._id === teamID;
        });
        if (team.length > 0) {
            return team[0].name;
        } else {
            return "";
        }
    }

    getMemberLocation(memberTeamID) {
        let officeID = -1;
        let team = this.state.teams.filter((team) => {
            return team._id === memberTeamID;
        });

        if (team.length > 0) {
            officeID = team[0].office;
        } else {
            return "";
        }

        let officeName = this.state.locations.filter((location) => {
            return location._id === officeID;
        })[0].name;

        return officeName;
    }

    handleFilterSelect(event) {
        console.log(event.target.attributes);
        runInAction(
            () =>
                (this.state.tableFilters.global =
                    event.target.attributes.name.value)
        );

        this.filterTableRows();
    }

    handleInputChange(event) {
        runInAction(() => {
            this.state.tableFilters[event.target.attributes.name.value] =
                event.target.value;
        });

        this.filterTableRows();
    }

    selectAllMembers(event) {
        if (!event.target.checked && this.state.selectedMembers.length > 0) {
            runInAction(() => {
                this.state.selectedMembers.splice(
                    0,
                    this.state.selectedMembers.length
                );
            });
        } else {
            runInAction(() => {
                this.state.members.forEach((member) => {
                    this.state.selectedMembers.push(member._id);
                });
            });
        }
    }

    selectMember(event, memberID) {
        if (!event.target.checked) {
            let itemIndex = this.state.selectedMembers.indexOf(memberID);
            if (itemIndex > -1) {
                this.state.selectedMembers.splice(itemIndex, 1);
            }
        } else {
            this.state.selectedMembers.push(memberID);
        }
    }

    allMembersSelected() {
        let result =
            this.state.members.every((member) => {
                return this.isMemberSelected(member._id);
            }) && this.state.members.length > 0;
        return result;
    }

    isMemberSelected(memberID) {
        let member = this.state.members.filter((member) => {
            return member._id === memberID;
        })[0];
        if (this.state.selectedMembers.includes(member._id)) {
            return true;
        } else {
            return false;
        }
    }

    async deleteMembers() {
        if (this.state.selectedMembers.length === 0) {
            alert("No members are selected!");
        }
        let deletedMembers = await this.transportLayer.deleteMembers(
            this.state.selectedMembers
        );

        deletedMembers.forEach((member) => {
            runInAction(() => {
                let index = this.state.members.indexOf(member._id);
                this.state.members.splice(index, 1);
            });
        });
    }

    async handleSubmitForm(event) {
        let createdMember = await this.formStore.submitForm(event);

        if (createdMember !== undefined && createdMember !== null) {
            runInAction(() => {
                this.state.members.push(createdMember[0]);
                this.state.isModalOpen = false;
                this.formStore.resetState();
            });
        }
    }

    filterTableRows() {
        let members = this.state.members;

        if (
            this.state.tableFilters.location === "all" &&
            this.state.tableFilters.team === "all" &&
            this.state.tableFilters.global === "all" &&
            this.state.tableFilters.searchValue === ""
        ) {
            runInAction(
                () => (this.state.filteredMembers = this.state.members)
            );
        } else {
            runInAction(
                () =>
                    (this.state.filteredMembers = members
                        .filter(this.filterByGlobal)
                        .filter(this.filterByLocation)
                        .filter(this.filterByTeam)
                        .filter(this.filterBySearch)
                        .sort(this.sortMembers(this.state.tableFilters.order)))
            );
        }
    }

    filterByLocation(member) {
        let memberTeam = this.state.teams.find(
            (team) => team._id === member.team
        );
        let officeLocation = this.state.locations.find(
            (location) => location._id === memberTeam.office
        );

        if (officeLocation._id === this.state.tableFilters.location) {
            return true;
        } else if (this.state.tableFilters.location === "all") {
            return true;
        } else {
            return false;
        }
    }

    filterByTeam(member) {
        if (this.state.tableFilters.team === "all") {
            return true;
        } else if (member.team === this.state.tableFilters.team) {
            return true;
        } else {
            return false;
        }
    }

    filterByGlobal(member) {
        if (this.state.tableFilters.global === "all") {
            return true;
        } else if (member.calculatedStatus === this.state.tableFilters.global) {
            return true;
        } else {
            return false;
        }
    }

    filterBySearch(member) {
        if (
            member.name
                .toLowerCase()
                .includes(this.state.tableFilters.searchValue.toLowerCase())
        ) {
            return true;
        } else {
            return false;
        }
    }

    toggleSortMembers(event) {
        let order = event.target.attributes.order.value;
        if (order === "asc") {
            runInAction(() => (this.state.tableFilters.order = "desc"));
        } else {
            runInAction(() => (this.state.tableFilters.order = "asc"));
        }

        runInAction(() => this.sortMembers(this.state.tableFilters.order));
    }

    sortMembers(order) {
        this.state.filteredMembers.sort((a, b) => {
            if (order === "asc") {
                if (a.startDate < b.startDate) {
                    return -1;
                } else if (a.startDate > b.startDate) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (a.startDate > b.startDate) {
                    return -1;
                } else if (a.startDate < b.startDate) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }

    handleSearchMembers(value) {
        runInAction(() => {
            this.state.tableFilters.searchValue = value;
        });
        this.filterTableRows();
    }
}

const store = new Store(formStore, transportLayer);

export default store;
