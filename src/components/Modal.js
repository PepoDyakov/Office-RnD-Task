import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../App";

import { parseDateForInput } from "../utils/parseDate";

import Button from "../components/Button";
import Dropdown from "./Dropdown";
import FormInput from "../components/FormInput";

import "../styles/components/Modal.scss";

const Modal = observer((props) => {
    const store = useContext(Context);
    const { isModalOpen, locations, teams } = store.state;
    const { formData } = store.formStore.state;

    return (
        <div className={`modal-container ${isModalOpen ? "open" : "closed"}`}>
            <div className="modal-header">Add Member</div>
            <div className="modal-form-container">
                <form
                    id="my-form"
                    className="modal-form"
                    onSubmit={(ev) => store.handleSubmitForm(ev)}
                >
                    <FormInput
                        placeholder="Full Name..."
                        type="text"
                        handleChange={store.formStore.handleInputChange}
                        name="name"
                        value={formData.name}
                    >
                        Name *
                    </FormInput>
                    <Dropdown
                        formDropdown
                        defaultValue={formData.location}
                        placeholder="Select location"
                        list={locations}
                        handleChange={store.formStore.handleInputChange}
                        name="location"
                    >
                        Location *
                    </Dropdown>
                    <Dropdown
                        formDropdown
                        list={teams}
                        defaultValue={formData.team}
                        placeholder="Select Company"
                        handleChange={store.formStore.handleInputChange}
                        name="team"
                    >
                        Company *
                    </Dropdown>
                    <FormInput
                        placeholder="Contact email..."
                        type="email"
                        name="email"
                        handleChange={store.formStore.handleInputChange}
                        value={formData.email}
                    >
                        Email
                    </FormInput>
                    <FormInput
                        placeholder="Start Date"
                        type="date"
                        name="startDate"
                        handleChange={store.formStore.handleInputChange}
                        value={parseDateForInput(formData.startDate)}
                    >
                        Start Date
                    </FormInput>
                    <FormInput
                        placeholder="Phone number..."
                        type="phone"
                        name="phone"
                        handleChange={store.formStore.handleInputChange}
                        value={formData.phone}
                    >
                        Phone
                    </FormInput>
                </form>
            </div>
            <div className="modal-footer">
                <Button onClick={() => store.closeModal()}>Cancel</Button>
                <Button action form="my-form" type="submit">
                    Save
                </Button>
            </div>
        </div>
    );
});

export default Modal;
