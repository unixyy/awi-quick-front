import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { zoneById } from "../routes/routes";
import { ZoneDto } from "../dto/zones.dto";
import axios from "axios";

const defaultZone: ZoneDto = {
  id: 0,
  name: "",
  rooms: [],
};

export default function Zone() {
  const params = useParams();
  const [zone, setZone] = useState<ZoneDto>(defaultZone);

  useEffect(() => {
    axios.get(zoneById(Number(params.zoneId)))
      .then((response) => {
        setZone(response.data);
      }
    );
  }, [params.id]);

  return (
    <>
      <div className="maroon-palet font-bold text-6xl mr-auto">
        Zones - {zone.name}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 max-w-sm">
          <div className="col-span-2 font-bold">Room</div>
          <div className="font-bold">Tables</div>
          {zone.rooms.map((room) => (
            <React.Fragment key={room.id}>
              <div className="col-span-2">{room.name}</div>
              <div>{room.tables.length}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
