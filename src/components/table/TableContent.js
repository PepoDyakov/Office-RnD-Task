import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import "../../styles/components/table/TableContent.scss";

export default function TableContent(params) {
    return (
        <table className="table">
            <TableHeader />
            <TableBody />
        </table>
    );
}
