import {useEffect, useState} from "react";
import axios from "axios";
import { GameDto } from "../../dto/games.dto";
import {AssignGameZoneDto} from "../../dto/assignGameZone.dto";
import {ZoneDto} from "../../dto/zones.dto";
import {
  gamesByZone,
  gameRoot,
  GameZoneAssign,
  GameZoneUnassign,
  zoneRoot
} from "../../routes/routes";

type GameAssignmentDto = GameDto & {checked: boolean};

export default function ManageGameAssignement() {
  const [games, setGames] = useState<GameAssignmentDto[]>([]);
  const [zones, setZones] = useState<ZoneDto[]>([]);
  const [disponibleRoom, setDisponibleRoom] = useState<AssignGameZoneDto[]>([]);
  const [zoneId, setZoneId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [toggleGames, setToggleGames] = useState<Map<string, boolean>>(new Map());


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adding = axios.post(GameZoneAssign(roomId), {ids: Array.from(toggleGames.entries()).filter(x => x[1]).map(x => x[0])});
    const removing = axios.delete(GameZoneUnassign(roomId), {data: {ids: Array.from(toggleGames.entries()).filter(x => !x[1]).map(x => x[0])}});

    Promise.all([adding, removing]).then(() => {
      alert("Success");
    }).catch(() => {
      alert("Error");
    }
    );
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneId(e.target.value);
    axios
      .get(gamesByZone(parseInt(e.target.value)))
      .then((res) => {
          const assignments: AssignGameZoneDto[] = res.data;
          setDisponibleRoom(assignments);
        }
        );
  };

  const handleGameChange = (e :  React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const checked = e.target.checked;
    const updatedGames = [...games];
    const game = updatedGames.find(x => x.id == id);
    if(game){
      game.checked = checked;
      setGames(updatedGames);
    }
    setToggleGames(new Map(toggleGames.set(id,checked)));
  }

  useEffect(() => {
    axios.get(zoneRoot).then((res) => setZones(res.data));
    axios.get(gameRoot).then((res) => setGames(res.data.map((x : GameAssignmentDto) => ({...x, checked: false}))));
  }, []);

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomId(event.target.value)
    const room = disponibleRoom.find(x => x.id === parseInt(event.target.value));
    if(room){
      setGames(games.map(game => ({...game, checked: room.game_assignments.some(x => {
          return x.id == game.id
        })})))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label htmlFor="Zones" className="block font-bold mb-2">
            Zones
          </label>
          <select
            id="zone"
            className="block w-full border-gray-300 text-white rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
      <div className="w-1/2 px-2">
        <label htmlFor="Rooms" className="block font-bold mb-2">
          Rooms
        </label>
        <select
          id="rooms"
          className="block w-full border-gray-300 text-white rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={roomId}
          onChange={handleRoomChange}
        >
          <option value="">Select a Room</option>
          {disponibleRoom.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      </div>

      { zoneId.length > 0 && roomId.length > 0 &&
        (<div className="mb-4">
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        <label className="block font-bold mb-2">Games</label>
        <div className="flex flex-wrap">
          {games.map((game, index) => (
            <div key={game.id} className="flex items-center mb-2 pt-2 border-t-2 w-1/2">
              <input
                type="checkbox"
                id={game.id}
                className="border-gray-300 rounded-sm shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={games[index].checked}
                onChange={handleGameChange}
              />
              <label htmlFor={`Game-${index}`} className="ml-2">
                <div>
                  {game.name}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>)}
    </form>
  );
}
