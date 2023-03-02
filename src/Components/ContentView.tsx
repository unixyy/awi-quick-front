import { useState } from "react";
import Pagination from "./Pagination";
import { ZoneDto } from '../dto/zones.dto';

/* ********* HOW TO USE *********
 * This table component is made to be used with any kind of data.
 * First, you need to define the type of your data, then make it extends TableData.
 * Then, you need to define the headers of your table, and the cellFactory.
 */

interface CellContent {
  content: string | number;
}

interface TableProps<T extends TableData> {
  data: T[];
  elementPerPage: number;
  cellFactory: (row: T) => JSX.Element;
}

export interface TableData {
  id: string | number;
  onClick?: () => void;
}

export const TextBlock = (content: CellContent) => (
  <div className="px-4 py-2 text-white">{content.content}</div>
);

export default function ContentView<T extends TableData>(props: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(props.elementPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = props.data.slice(indexOfFirstData, indexOfLastData);

  const handleClick = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="py-2 lg:p-6">
      <div className="flex flex-wrap">
        {currentData.map((row) => (
          <div key={row.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
            {props.cellFactory(row)}
          </div>
        ))}
      </div>
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
