import HeaderCarousel from "../../Components/HeaderCarousel";
import Table, { TableData } from "../../Components/Table";

export interface PageProperties {
  title: string;
  images: { title: string; src: string; alt: string }[];
  searchResult: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  entityCellFactory: (row: TableData) => JSX.Element;
}

export default function Games(params: PageProperties) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderCarousel slides={params.images} title={params.title} />
      {/*<GameSearchBar />*/}
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
      <button className="w-max mr-6 ml-auto mt-12 font-bold text-xl bg-green-600 ">
        Create
      </button>
      <Table
        data={params.searchResult}
        elementPerPage={6}
        cellFactory={params.entityCellFactory}
      />
    </div>
  );
}
