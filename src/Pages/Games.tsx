import { useState, useEffect } from "react";
import { TableData, TextBlock } from "../Components/Table";
import { GameDto } from "../dto/games.dto";
import routes from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";

const images = [
  {
    title: "Slide 1",
    src: "../front-bg/boardgame1.jpg",
    alt: "Slide 1",
  },
  {
    title: "Slide 2",
    src: "../front-bg/boardgame2.jpg",
    alt: "Slide 2",
  },
  {
    title: "Slide 3",
    src: "../front-bg/boardgame3.jpg",
    alt: "Slide 3",
  },
  {
    title: "Slide 4",
    src: "../front-bg/boardgame4.jpg",
    alt: "Slide 4",
  },
];

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
    <DisplayPage
      title={"Games"}
      images={images}
      searchResult={searchResult}
      handleSearch={handleSearch}
      entityCellFactory={gameCellFactory}
    />
  );
}
