import Table, { TableData } from "../../Components/ContentView";

export interface PageProperties<T extends TableData> {
  searchResult: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  entityFactory: (row: T) => JSX.Element;
}

export default function Page<T extends TableData>(params: PageProperties<T>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-maroon-palet p-6 rounded-b-lg flex flex-col items-center">
        <input
          type="text"
          className="p-2 w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"
          placeholder="Search..."
          onChange={params.handleSearch}
        />
      </div>
      <Table
        data={params.searchResult}
        elementPerPage={12}
        cellFactory={params.entityFactory}
      />
    </div>
  );
}
