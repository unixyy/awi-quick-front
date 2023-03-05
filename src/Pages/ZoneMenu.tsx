import React, { useEffect, useState } from "react";
import { ZoneDto } from "../dto/zones.dto";
import { zoneRoot } from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";
import { useNavigate } from "react-router-dom";

export default function ZoneMenu() {
  const [zones, setZones] = useState<ZoneDto[]>([]);
  const [searchResult, setSearchResult] = useState<ZoneDto[]>([]);
  const navigate = useNavigate();

  const zoneCellFactory = (zone: ZoneDto) => (
    <div
      className="bg-brown-palet rounded-lg shadow-lg p-6 m-4 flex flex-col text-lg cursor-pointer text-white"
      onClick={() => navigate(`/zones/${zone.id}`)}
    >
      {zone.name}
    </div>
  );

  useEffect(() => {
    fetch(zoneRoot)
      .then((response) => response.json())
      .then((data) => {
        setZones(data);
        setSearchResult(data);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = zones.filter((zone) =>
      zone.name.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResult(result);
  };

  return (
    <>
      <div>
        <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">
          Zones
        </div>
      </div>
      <DisplayPage
        searchResult={searchResult}
        handleSearch={handleSearch}
        entityFactory={zoneCellFactory}
      />
    </>
  );
}
