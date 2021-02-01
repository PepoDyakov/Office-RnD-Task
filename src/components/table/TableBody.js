import TableRow from "./TableRow";

import "../../styles/components/table/TableBody.scss";
import { observer } from "mobx-react-lite";

const TableBody = observer(({ members }) => {
    return (
        <tbody className="table-body">
            {members.map((member) => (
                <TableRow member={member} key={member._id} />
            ))}
        </tbody>
    );
});

export default TableBody;
