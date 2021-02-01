import { observer } from "mobx-react-lite";

import Label from "../Label";
import { parseDate } from "../../utils/parseDate";

import LocationIcon from "../../assets/location-icon.png";

import "../../styles/components/table/TableRow.scss";
import { useContext } from "react";
import { Context } from "../../App";

const TableRow = observer(({ member }) => {
    const store = useContext(Context);
    return (
        <tr
            className={`table-row ${
                store.state.selectedMembers.includes(member._id)
                    ? "selected"
                    : ""
            }`}
        >
            <td className="table-cell" key="checkbox">
                <input
                    type="checkbox"
                    className="row-selector"
                    checked={store.state.selectedMembers.includes(member._id)}
                    onChange={(ev) => store.selectMember(ev, member._id)}
                />
            </td>
            <td className="table-cell" key="photo">
                {!!member.image ? (
                    <img
                        src={member.image}
                        className="member-photo"
                        alt="Ken Block"
                    />
                ) : (
                    <div className="blank-member-photo"></div>
                )}
                <p className="cell-text">{member.name}</p>
            </td>
            <td className="table-cell" key="team">
                <p className="cell-text">{store.getTeamName(member.team)}</p>
            </td>
            <td className="table-cell" key="status">
                <Label active={member.status}>{member.status}</Label>
                {member.calculatedStatus !== "active" && (
                    <Label>{member.calculatedStatus}</Label>
                )}
            </td>
            <td className="table-cell" key="startDate">
                <p className="cell-text">{parseDate(member.startDate)}</p>
            </td>
            <td className="table-cell" key="location">
                <img
                    className="location-icon"
                    src={LocationIcon}
                    alt="Location Icon"
                />
                <p className="cell-text">
                    {store.getMemberLocation(member.team)}
                </p>
            </td>
        </tr>
    );
});

export default TableRow;
