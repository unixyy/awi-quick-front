import Table, { TableData } from "../../Components/Table";

export interface PageProperties {

  searchResult: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  entityCellFactory: (row: TableData) => JSX.Element;
}

export default function Games(params: PageProperties) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-maroon-palet p-6 rounded-b-lg flex flex-col items-center">
        <input
          type={"text"}
          className={
            "w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"
          }
          placeholder={"Search..."}
          onChange={params.handleSearch}
        />
      </div>
      <Table
        data={params.searchResult}
        elementPerPage={6}
        cellFactory={params.entityCellFactory}
      />
    </div>
  );
}
