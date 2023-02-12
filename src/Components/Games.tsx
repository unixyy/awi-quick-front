import GameSearchBar from "./GameSearchBar";
import HeaderCarousel from "./HeaderCarousel";
import Table, { TableData, StylizedCell, StylizedHeader } from "./Table";
import { useEffect, useState } from "react";
import { GameDto } from "../dto/games.dto";
import routes from "../routes/routes";

interface GameData extends TableData {
    id: number;
    name: string;
    type: string;
    zones?: string[];
}

const gameHeaders = (withZones: boolean) => (
    <div className="bg-maroon-palet rounded-lg shadow-lg p-6 m-4 flex flex-row">
        <StylizedHeader content="ID" />
        <StylizedHeader content="Name" />
        <StylizedHeader content="Type" />
        {withZones && <StylizedHeader content="Zone" />}
    </div>
);
const gameCellFactory = (row: TableData) => {
    const content = row as GameData;
    return (
        <div className="bg-brown-palet rounded-lg shadow-lg p-6 m-4  flex flex-col">
            <StylizedCell content={content.id} />
            <StylizedCell content={content.name} />
            <StylizedCell content={content.type} />
            {content.zones && (
                <StylizedCell content={content.zones.join(", ")} />
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

    useEffect(() => {
        fetch(routes.gameRoot)
            .then((response) => response.json())
            .then((data) => setGames(data));
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <HeaderCarousel slides={images} title="Games" />
            <GameSearchBar />
            <button className="w-max mr-6 ml-auto mt-12 font-bold text-xl bg-green-600 ">
                Create
            </button>
            <Table
                data={games}
                elementPerPage={6}
                headers={gameHeaders(false)}
                cellFactory={gameCellFactory}
            />
        </div>
    );
}
