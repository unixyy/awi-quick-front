import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { zoneById, gamesByZone } from "../routes/routes";
import { ZoneDto } from "../dto/zones.dto";
import axios from "axios";
import { AssignGameZoneDto } from "../dto/assignGameZone.dto";

const defaultZone: ZoneDto = {
  id: 0,
  name: "",
  rooms: [],
};

export default function Zone() {
  const params = useParams();
  const [zone, setZone] = useState<ZoneDto>(defaultZone);
  const [rooms, setRooms] = useState<AssignGameZoneDto[]>([]);

  useEffect(() => {
    axios
      .get(zoneById(Number(params.zoneId)))
      .then((response) => setZone(response.data));
    axios
      .get(gamesByZone(Number(params.zoneId)))
      .then((response) => setRooms(response.data));
  }, [params.id]);

  return (
    <>
      <div className="maroon-palet font-bold text-6xl mr-auto">
        Zones - {zone.name}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4">
          <div className="grid grid-cols-4 gap-4 w-full col-span-6 border-b-2 pb-4">
            <div className="font-bold">Room</div>
            <div className="font-bold">Table Count</div>
            <div className="font-bold">Game</div>
            <div className="font-bold">Type</div>
          </div>
          {zone.rooms.map((room) => (
            <div key={room.id} className="grid grid-cols-4 gap-4 w-full col-span-6 border-dashed border-b-2 pb-4">
              <div className="flex items-center justify-center">
                {room.name}
              </div>
              <div className="flex items-center justify-center">{room.tables.length}</div>
              <div className="col-span-2">
                {
                  rooms
                  .find((assignment) => assignment.id == room.id)
                  ?.game_assignments.map((game) => (
                    <div key={game.id} className={`grid grid-cols-2 col-span-2 space-x-4 my-2`}>
                      <div>{game.name}</div>
                      <div>{game.type}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
