import { action, makeAutoObservable } from "mobx";
import { parseDate } from "../utils/parseDate";
import transportLayer from "./transportLayer";

const initialState = {
    formData: {
        name: "",
        email: "",
        location: "all",
        team: "all",
        phone: "",
        startDate: parseDate(Date.now()),
    },
};

class FormStore {
    state = initialState;
    transportLayer = {};

    constructor(transportLayer) {
        makeAutoObservable(this, {
            openDropDown: action.bound,
            resetState: action.bound,
            handleInputChange: action.bound,
            handleInputSelectChange: action.bound,
            handleSubmitForm: action.bound,
        });

        this.transportLayer = transportLayer;
    }

    openDropDown(dropdownID) {
        if (dropdownID === this.state.openedDropDownID) {
            this.state.openedDropDownID = -1;
        } else {
            this.state.openedDropDownID = dropdownID;
        }
    }

    resetState() {
        this.state = initialState;
    }

    handleInputChange(event) {
        event.stopPropagation();
        let inputType = event.target.attributes.name.value;
        let value = event.target.value;
        if (inputType === "date") {
            this.state.formData[event.target.attributes.name.value] = new Date(
                value
            );
        } else {
            this.state.formData[event.target.attributes.name.value] = value;
        }
    }

    async submitForm(event) {
        event.preventDefault();
        let createdMember = await this.transportLayer.createMember(
            this.state.formData
        );
        return createdMember;
    }
}

const formStore = new FormStore(transportLayer);

export default formStore;
