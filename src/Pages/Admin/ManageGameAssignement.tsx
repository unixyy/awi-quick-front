import {useEffect, useState} from "react";
import axios from "axios";
import { GameDto } from "../../dto/games.dto";
import {AssignGameZoneDto} from "../../dto/assignGameZone.dto";
import {RoomDto, ZoneDto} from "../../dto/zones.dto";
import {gameByZone, gameRoot, gamesZone, roomRoot, zoneById, zoneRoot} from "../../routes/routes";

export default function ManageGameAssignement() {
  const [games, setGames] = useState<GameDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [zones, setZones] = useState<ZoneDto[]>([]);
  const [assignments, setAssignments] = useState<AssignGameZoneDto[]>([]);
  const [zoneId, setZoneId] = useState("");
  const [gameId, setGameId] = useState("");
  const [selectedRooms, setSelectedRooms] = useState<{[id: number]: boolean}[]>([]);
  const [resultSearch, setResultSearch] = useState<{[id: number]: boolean}[]>([]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneId(e.target.value);
    axios
      .get(gameByZone(parseInt(e.target.value)))
      .then((res) => {
        const assignments: AssignGameZoneDto[] = res.data;
        setAssignments(assignments)
        setSelectedRooms(assignments.map((x) => ({[x.name]: true})));
        setResultSearch(selectedRooms);

      });
  };

  useEffect(() => {
    axios.get(zoneRoot).then((res) => setZones(res.data));
    axios.get(gameRoot).then((res) => setGames(res.data));
    axios.get(roomRoot).then((res) => setRooms(res.data));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label htmlFor="Game" className="block font-bold mb-2">
            Game
          </label>
          <select
            id="game"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
          >
            <option value="">Select a Game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 px-2">
          <label htmlFor="Zones" className="block font-bold mb-2">
            Zones
          </label>
          <select
            id="zone"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={zoneId}
            onChange={handleZoneChange}
          >
            <option value="">Select a Zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Rooms</label>
        <div className="flex flex-wrap">
          {rooms.map((room, index) => (
            <div key={room.id} className="flex items-center mb-2 pt-2 border-t-2 w-1/2">
              <input
                type="checkbox"
                className="border-gray-300 rounded-sm shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={assignments.some((x) => x.id === room.id)}
                onChange={(event) => {}}
              />
              <label htmlFor={`room-${index}`} className="ml-2">
                <div>
                  {room.name}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </form>
  );
}
