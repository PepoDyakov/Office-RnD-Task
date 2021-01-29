import "../../styles/components/table/TableHeader.scss";

export default function TableHeader(props) {
    return (
        <thead className="table-header">
            <tr className="table-header-row table-filters">
                <td className="table-cell">
                    <input
                        type="checkbox"
                        className="row-selector row-selector-all"
                    />
                </td>
                <td className="table-cell">Member</td>
                <td className="table-cell">Team</td>
                <td className="table-cell">Status/Label</td>
                <td className="table-cell">Created At</td>
                <td className="table-cell">Location</td>
            </tr>
        </thead>
    );
}
