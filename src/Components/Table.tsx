import { useState } from "react";
import Pagination from "./Pagination";

/* ********* HOW TO USE *********
 * This table component is made to be used with any kind of data.
 * First, you need to define the type of your data, then make it extends TableData.
 * Then, you need to define the headers of your table, and the cellFactory.
 */

interface CellContent {
    content: string | number;
}

interface TableProps {
    data: TableData[];
    elementPerPage: number;
    cellFactory: (row: TableData) => JSX.Element;
}

export interface TableData {
    id: string | number;
}

export const TextBlock = (content: CellContent) => (
    <div className="px-4 py-2">{content.content}</div>
);

export default function Table(props: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(props.elementPerPage);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = props.data.slice(indexOfFirstData, indexOfLastData);

    const handleClick = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="py-2 lg:p-6 rounded-lg flex flex-col align-center">
            <ul className="w-max cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                {currentData.map((row, index) => (
                    <li
                        key={row.id}
                        className={`px-4 py-2 w-80 lg:w-96 align-middle`}
                    >
                        {props.cellFactory(row)}
                    </li>
                ))}
            </ul>
            {/*</table>*/}
            <div className="mt-6">
                <Pagination
                    dataPerPage={dataPerPage}
                    totalData={props.data.length}
                    currentPage={currentPage}
                    handleClick={handleClick}
                />
            </div>
        </div>
    );
}
