import { useState, useEffect } from "react";
import { TableData, TextBlock } from "../Components/Table";
import { GameDto } from "../dto/games.dto";
import routes from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";



const gameCellFactory = (row: TableData) => {
  const content = row as GameDto;
  return (
    <div className="bg-brown-palet rounded-lg shadow-lg p-6 m-4  flex flex-col">
      <TextBlock content={content.id} />
      <TextBlock content={content.name} />
      <TextBlock content={content.type} />
      {content.zones && <TextBlock content={content.zones.join(", ")} />}
    </div>
  );
};

export default function GamePage() {

  const [games, setGames] = useState<GameDto[]>([]);
  const [searchResult, setSearchResult] = useState<GameDto[]>([]);
  const src = "../front-bg/boardgame1.webp";

  useEffect(() => {
    fetch(routes.gameRoot)
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setSearchResult(data);
      });
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;
    const result = games.filter((entity) => {
      return (
        entity.name.toLowerCase().includes(search.toLowerCase()) ||
        entity.type.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  }
  return (
    <div>
      <div className={"w3-container"}>
      <img title={"Board Game"} src={src} alt="Board Game" className=" w-full h-[calc(80vh-10rem)] object-cover rounded-t-lg pointer-events-none" />
        <div className={"w3-centered text-6xl"}>Games</div>
      </div>
      <DisplayPage
        searchResult={searchResult}
        handleSearch={handleSearch}
        entityCellFactory={gameCellFactory}
      />
    </div>
  );
}
