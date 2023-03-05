import React, { useState } from "react";
import { RoomDto, ZoneDto } from "../../dto/zones.dto";
import {
  addRoomToZone,
  removeRoomFromZone,
  zoneRoot,
} from "../../routes/routes";
import axios from "axios";

const defaultZone: ZoneDto = {
  id: 0,
  name: "",
  rooms: [],
};

export default function ZoneForm() {
  const [zones, setZones] = useState<ZoneDto[]>([]);
  const [chosenZone, setChosenZone] = useState<ZoneDto>(defaultZone);
  const [zoneUpdates, setZoneUpdates] = useState<{ [id: number]: ZoneDto }>({});
  const [roomUpdates, setRoomUpdates] = useState<{ [id: number]: RoomDto }>({});
  const [updatePending, setUpdatePending] = useState<boolean>(false);

  const [newRoomName, setNewRoomName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      zoneUpdates: Object.keys(zoneUpdates).map((key) => {
        const { rooms, ...rest } = zoneUpdates[parseInt(key)];
        return { ...rest };
      }),
      roomUpdates: Object.keys(roomUpdates).map((key) => {
        const { tables, ...rest } = roomUpdates[parseInt(key)];
        return { ...rest, tableCount: tables.length };
      }),
    };
    axios.patch(zoneRoot, { ...data }).then(() => {
      setUpdatePending(false);
      setZoneUpdates({});
      setRoomUpdates({});
    });
  };

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoomName(e.target.value);
    setUpdatePending(true);
  };

  const changeChosenZoneName = (
    event: React.ChangeEvent<HTMLInputElement>,
    zoneId: number,
  ) => {
    const newZones = [...zones];
    const index = newZones.findIndex((zone) => zone.id === zoneId);
    newZones[index].name = event.target.value;
    setChosenZone(newZones[index]);
    setZoneUpdates({ ...zoneUpdates, [chosenZone.id]: newZones[index] });
    setUpdatePending(true);
  };

  const changeRoomName = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newRooms = [...chosenZone.rooms];
    newRooms[index].name = event.target.value;
    setChosenZone({ ...chosenZone, rooms: newRooms });
    setRoomUpdates({ ...roomUpdates, [newRooms[index].id]: newRooms[index] });
    setUpdatePending(true);
  };

  const changeRoomTableCount = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedRooms = [...chosenZone.rooms];
    let updatedTables = chosenZone.rooms[index].tables.slice(
      0,
      Math.min(
        chosenZone.rooms[index].tables.length,
        Number(event.target.value),
      ),
    );
    if (updatedTables.length < Number(event.target.value)) {
      updatedTables = updatedTables.concat(
        new Array(Number(event.target.value) - updatedTables.length).fill({
          number: 0,
        }),
      );
    }
    updatedRooms[index].tables = updatedTables;
    setRoomUpdates({
      ...roomUpdates,
      [updatedRooms[index].id]: updatedRooms[index],
    });
    setChosenZone({ ...chosenZone, rooms: updatedRooms });
    setUpdatePending(true);
  };

  const addRoom = () => {
    const updatedRooms = [...chosenZone.rooms];
    axios
      .post(addRoomToZone(chosenZone.id), { name: newRoomName })
      .then((response) => {
        const newRoom = response.data;
        updatedRooms.push(newRoom);
        console.log(updatedRooms);
        setChosenZone({ ...chosenZone, rooms: updatedRooms });
        setRoomUpdates({
          ...roomUpdates,
          [newRoom.id]: newRoom,
        });
      });
  };

  const removeRoom = (index: number) => {
    const updatedRooms = [...chosenZone.rooms];
    const removedRoom = updatedRooms.splice(index, 1);
    axios
      .delete(removeRoomFromZone(removedRoom[0].id))
      .then(() => setChosenZone({ ...chosenZone, rooms: updatedRooms }));
  };

  React.useEffect(() => {
    fetch(zoneRoot)
      .then((response) => response.json())
      .then((data) => setZones(data));
  }, []);

  return (
    <>
      <select
        onChange={(e) => setChosenZone(zones[Number(e.target.value) - 1])}
      >
        <option value={undefined}>Choose a zone</option>
        {zones.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zone.name}
          </option>
        ))}
      </select>
      {chosenZone.name && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="outlined"
            value={chosenZone.name}
            onChange={(e) => changeChosenZoneName(e, chosenZone.id)}
          />
          <div className="w-full max-w-3xl grid grid-cols-3 gap-4 place-items-center">
            <div className="py-2 font-bold">Room Name</div>
            <div className="py-2 font-bold">Table Count</div>
            <div className="py-2 font-bold">Remove Room</div>
            {chosenZone.rooms.map((room, index) => (
              <div
                key={room.id}
                className="col-span-3 grid grid-cols-3 gap-4 place-items-center"
              >
                <div>
                  <input
                    type="text"
                    className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={room.name}
                    onChange={(e) => changeRoomName(e, index)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={1}
                    className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={room.tables.length}
                    onChange={(e) => changeRoomTableCount(e, index)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeRoom(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="py-2 col-span-3">
              <input
                type="text"
                className="outlined"
                placeholder="Enter the zone name"
                onChange={(e) => setName(e)}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => addRoom()}
              >
                Add Room
              </button>
            </div>
          </div>
          {updatePending && (
            <div className="flex justify-center items-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mt-0"
                type="submit"
              >
                Apply Updates
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
