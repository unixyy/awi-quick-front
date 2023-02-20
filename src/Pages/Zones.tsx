import { useState, useEffect } from "react";
import { TableData, TextBlock } from "../Components/Table";
import { ZoneDto } from "../dto/zones.dto";
import routes from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";

const images = [
  {
    title: "Slide 1",
    src: "../front-bg/boardgone1.jpg",
    alt: "Slide 1",
  },
  {
    title: "Slide 2",
    src: "../front-bg/boardgone2.jpg",
    alt: "Slide 2",
  },
  {
    title: "Slide 3",
    src: "../front-bg/boardgone3.jpg",
    alt: "Slide 3",
  },
  {
    title: "Slide 4",
    src: "../front-bg/boardgone4.jpg",
    alt: "Slide 4",
  },
];

const zoneCellFactory = (row: TableData) => {
  const content = row as ZoneDto;
  return (
    <div className="bg-brown-palet rounded-lg shadow-lg p-6 m-4  flex flex-col">
      <TextBlock content={content.name + " - " + content.number} />
    </div>
  );
};

export default function ZonePage() {
  const [zones, setZones] = useState<ZoneDto[]>([]);
  const [searchResult, setSearchResult] = useState<ZoneDto[]>([]);

  useEffect(() => {
    fetch(routes.zoneRoot)
      .then((response) => response.json())
      .then((data) => {
        setZones(data);
        setSearchResult(data);
      });
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO
  }
  return (
    <DisplayPage
      title={"Zones"}
      images={images}
      searchResult={searchResult}
      handleSearch={handleSearch}
      entityCellFactory={zoneCellFactory}
    />
  );
}
