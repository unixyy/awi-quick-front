import { useEffect, useState } from "react";
import axios from "axios";
import { gameRoot } from "../../routes/routes";
import { GameDto } from "../../dto/games.dto";

export default function ManageGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(gameRoot)
      .then((response) => response.json())
      .then((response) => setGames(response.data));
  });
  return (
    <div>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">
        Manage Games
      </div>
      <table className={"bg-emerald-400"}>
        <thead className={"border"}>
          <tr className={""}>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Zones</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game: GameDto) => (
            <tr key={game.id} className={"border space-x-4"}>
              <td className={"justify-start"}>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.type}</td>
              <td>{game.zones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
