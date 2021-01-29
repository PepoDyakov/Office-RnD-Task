import ProfilePhoto from "../../assets/profile-picture.png";

import LocationIcon from "../../assets/location-icon.png";
import parseDate from "../../utils/parseDate";

import "../../styles/components/table/TableRow.scss";

export default function TableRow(props) {
    return (
        <tr className="table-row">
            <td className="table-cell ">
                <input type="checkbox" className="row-selector" />
            </td>
            <td className="table-cell">
                <img
                    src={ProfilePhoto}
                    className="member-photo"
                    alt="Ken Block"
                />
                <p className="cell-text">Ken Block</p>
            </td>
            <td className="table-cell">
                <p className="cell-text">Monster Energy Racing</p>
            </td>
            <td className="table-cell">
                <p className="cell-text">Active New</p>
            </td>
            <td className="table-cell">
                <p className="cell-text">{parseDate(Date.now())}</p>
            </td>
            <td className="table-cell">
                <img
                    className="location-icon"
                    src={LocationIcon}
                    alt="Location Icon"
                />
                <p className="cell-text">London HQ</p>
            </td>
        </tr>
    );
}
