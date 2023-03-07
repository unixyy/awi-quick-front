import { useEffect, useState } from "react";
import axios from "axios";
import { gameRoot, gameTypes } from "../../routes/routes";
import { GameDto, GameTypeDto } from "../../dto/games.dto";
import ManagePage from "../templates/ManagePage";

export default function ManageGames() {
  const [games, setGames] = useState<GameDto[]>([]);
  const [searchResult, setSearchResult] = useState<GameDto[]>([]);
  const keyofGames = ["name", "type"];

  const [types, setTypes] = useState<GameTypeDto[]>([]);
  const [newGameName, setNewGameName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    axios.get(gameRoot).then((response) => {
      setGames(response.data);
      setSearchResult(response.data);
    });
    axios.get(gameTypes).then((response) => {
      setTypes(response.data);
    });
  }, []);

  const searchFilter = (search: string) => (entity: GameDto) =>
    entity.name.toLowerCase().includes(search.toLowerCase()) ||
    entity.type.toLowerCase().includes(search.toLowerCase());

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = games.filter(searchFilter(search));
    setSearchResult(result);
  };

  // TODO : Fix this
  const handleSubmit = (oldData: GameDto, newData: GameDto) => {
    axios.put(gameRoot, newData).then((response) => {
      console.log(response);
    });
  };

  const createGame = () => {
    axios
      .post(gameRoot, { name: newGameName, type: selectedType })
      .then((response) => {
        setGames([...games, response.data]);
        if (searchFilter(newGameName)(response.data))
          setSearchResult([...searchResult, response.data]);
      });
  };

  return (
    <div>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">
        Manage Games
      </div>
      <div className="flex my-4 justify-between">
        <input
          type="text"
          className="outlined"
          placeholder="Enter the game's name"
          onChange={(e) => setNewGameName(e.target.value)}
        />
        <select
          className="outlined"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="" disabled selected>
            Type
          </option>
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.name}
            </option>
          ))}
        </select>
        <button
          className="bg-maroon-palet text-white font-bold py-2 px-4 rounded"
          onClick={() => createGame()}
        >
          Create Game
        </button>
      </div>
      <ManagePage
        searchResult={searchResult}
        handleSearch={handleSearch}
        names={keyofGames}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
