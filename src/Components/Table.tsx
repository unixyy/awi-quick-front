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
  headers: JSX.Element;
  cellFactory: (row: TableData) => JSX.Element;
}

export interface TableData {
  id: string | number;
}

export const StylizedHeader = (content: CellContent) => (
  <th className="px-4 py-2">{content.content}</th>
);

export const StylizedCell = (content: CellContent) => (
  <td className="px-4 py-2">{content.content}</td>
);

export default function Table(props: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(props.elementPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = props.data.slice(indexOfFirstData, indexOfLastData);

  const handleClick = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 rounded-lg">
      <table className="table-auto w-full text-left bg-emerald-800 text-white">
        <thead>
          <tr className="bg-emerald-900 border-b">{props.headers}</tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-emerald-800" : "bg-emerald-700"
              } px-4 py-2`}
            >
              {props.cellFactory(row)}
            </tr>
          ))}
        </tbody>
      </table>
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
