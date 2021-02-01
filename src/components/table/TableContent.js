import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import "../../styles/components/table/TableContent.scss";
import { observer } from "mobx-react-lite";

const TableContent = observer(({ members }) => {
    return (
        <table className="table">
            <TableHeader />
            <TableBody members={members} />
        </table>
    );
});

export default TableContent;
