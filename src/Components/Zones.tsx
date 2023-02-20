import Table, {TextBlock, TableData} from "./Table";
import {useEffect, useState} from "react";
import {ZoneDto} from "../dto/zones.dto";
import routes from "../routes/routes";


interface ZoneData {
  id: number;
  name: string;
  num : number;
  src : string;
  description : string;

}
const zoneCellFactory = (row: TableData) => {
  const content = row as ZoneData;
  return (
    <div className="bg-brown-palet rounded-lg shadow-lg p-6 m-4  flex flex-col">
      <TextBlock content={content.name} />
      <TextBlock content={content.num} />
    </div>
  );
};
export default function Zones() {
  const [zones,setZones] = useState<ZoneDto[]>([]);
  const [searchResult,setSearchResult] = useState<ZoneDto[]>([]);

  useEffect(() => {
    fetch(routes.zoneRoot)
      .then((response) => response.json())
      .then((data) => {
        setZones(data)
        setSearchResult(data)
      });
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;
    const result = zones.filter((zone) => zone.name.toLowerCase().includes(search.toLowerCase()));
    setSearchResult(result);
  }

  return (
    <div>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto" >Zones</div>
      <input type="text"
             className="p-2 w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"
             placeholder="Search"
             onChange={handleSearch}
      />

      <Table
        data={searchResult}
        elementPerPage={9}
        cellFactory={zoneCellFactory}
      />
    </div>
  );
}