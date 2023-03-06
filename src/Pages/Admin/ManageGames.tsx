import { useEffect, useState } from "react";
import axios from "axios";
import { gameRoot } from "../../routes/routes";
import { GameDto } from "../../dto/games.dto";
import ManagePage from "../templates/ManagePage";

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const keyofGames = ["id", "name", "type"];

  useEffect(() => {
    axios.get(gameRoot).then((response) => {
      setGames(response.data);
      setSearchResult(response.data);
    });
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = games.filter((entity: GameDto) => {
      return (
        entity.name.toLowerCase().includes(search.toLowerCase()) ||
        entity.type.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  };

  // TODO : Fix this
  const handleSubmit = (oldData: GameDto, newData: GameDto) => {
    axios.put(gameRoot, newData).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">
        Manage Games
      </div>
      <ManagePage
        searchResult={games}
        handleSearch={handleSearch}
        names={keyofGames}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
