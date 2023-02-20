import HeaderCarousel from "./HeaderCarousel";
import Table, { TableData, TextBlock } from "./Table";
import { useEffect, useState } from "react";
import { GameDto } from "../dto/games.dto";
import routes from "../routes/routes";

interface GameData extends TableData {
    id: number;
    name: string;
    type: string;
    zones?: string[];
}

const gameCellFactory = (row: TableData) => {
    const content = row as GameData;
    return (
        <div className="bg-brown-palet rounded-lg shadow-lg p-6 m-4  flex flex-col">
            <TextBlock content={content.id} />
            <TextBlock content={content.name} />
            <TextBlock content={content.type} />
            {content.zones && (
                <TextBlock content={content.zones.join(", ")} />
            )}
        </div>
    );
};

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

export default function Games() {
    const [games, setGames] = useState<GameDto[]>([]);
    const [searchResult, setSearchResult] = useState<GameDto[]>([]);

    useEffect(() => {
        fetch(routes.gameRoot)
            .then((response) => response.json())
            .then((data) => {
              setGames(data)
              setSearchResult(data)
            });
    }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;
    const result = games.filter((game) => {
      return (
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.type.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  }

  return (
        <div className="flex flex-col h-screen">
            <HeaderCarousel slides={images} title="Games" />
            {/*<GameSearchBar />*/}
          <div className="bg-maroon-palet p-6 rounded-b-lg flex flex-col items-center">
            <input type={"text"}
                   className={"w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"}
                   placeholder={"Search a Game"}
                   onChange={handleSearch}
            />

          </div>
            <button className="w-max mr-6 ml-auto mt-12 font-bold text-xl bg-green-600 ">
                Create
            </button>
            <Table
                data={searchResult}
                elementPerPage={6}
                cellFactory={gameCellFactory}
            />
        </div>
    );
}
