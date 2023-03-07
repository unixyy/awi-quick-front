import { useState, useEffect } from "react";
import { TextBlock } from "../Components/ContentView";
import { GameDto } from "../dto/games.dto";
import { gameRoot } from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";
import TitleTextOverImage from "../Components/Primary/TitleTextOverImage";
import { useNavigate } from "react-router-dom";


export default function GamePage() {
  const [games, setGames] = useState<GameDto[]>([]);
  const [searchResult, setSearchResult] = useState<GameDto[]>([]);
  const src = "../front-bg/boardgame1.webp";
  const navigate = useNavigate();
  const gameCellFactory = (game: GameDto) => (
    <div
      className="bg-brown-palet rounded-lg shadow-lg p-6 sm:m-2 md:m-4 flex flex-col cursor-pointer"
      onClick={() => navigate(`/games/${game.id}`)}
    >
      <TextBlock content={game.name} />
      <TextBlock content={game.type} />
      {game.zones && <TextBlock content={game.zones.join(", ")} />}
    </div>
  );

  useEffect(() => {
    fetch(gameRoot)
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
      <TitleTextOverImage src={src} text="Games" />
      <DisplayPage
        searchResult={searchResult}
        handleSearch={handleSearch}
        entityFactory={gameCellFactory}
      />
    </div>
  );
}
