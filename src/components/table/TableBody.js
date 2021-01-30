import TableRow from "./TableRow";

import "../../styles/components/table/TableBody.scss";

export default function TableBody(props) {
    return (
        <tbody className="table-body">
            <TableRow selected />
            <TableRow />
            <TableRow />
        </tbody>
    );
}
