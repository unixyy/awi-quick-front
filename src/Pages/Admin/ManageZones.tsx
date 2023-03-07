import React, { useState } from "react";
import Popup from "../../Components/Popup";
import { RoomDto, ZoneDto } from "../../dto/zones.dto";
import {
  addRoomToZone,
  removeRoomFromZone,
  zoneRoot,
} from "../../routes/routes";
import axios from "axios";
import { zoneById } from '../../routes/routes';

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
  const [updatedRoomName, setUpdatedRoomName] = useState<string>("");

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

  const createNewRoom = () => {
    axios
      .post(zoneRoot, { name: newRoomName })
      .then(() => {
        setNewRoomName("");
        return <Popup title="Zone created" success={true} />;
      })
      .catch(() => <Popup title="Zone creation failed" success={false} />);
  };

  const updateRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedRoomName(e.target.value);
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
      .post(addRoomToZone(chosenZone.id), { name: updatedRoomName })
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

  const removeZone = () => {
    const remove = confirm("Are you sure you want to delete this zone?\nEvery assignments will be removed\nThis action cannot be undone");
    if (!remove) return;
    axios.delete(zoneById(chosenZone.id)).then(() => {
      const newZones = zones.filter((zone) => zone.id !== chosenZone.id);
      setZones(newZones);
      setChosenZone(newZones[0]);
    });
  };

  React.useEffect(() => {
    fetch(zoneRoot)
      .then((response) => response.json())
      .then((data) => {
        setZones(data);
      });
  }, []);

  console.log(chosenZone);

  return (
    <>
      <div className="w-ful flex space-x-2 mb-4">
        <input
          type="text"
          className="outlined"
          placeholder="Enter the zone name"
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => createNewRoom()}
        >
          Create zone
        </button>
      </div>
      <select
        onChange={(e) =>
          setChosenZone(
            zones.find((zone) => zone.id === parseInt(e.target.value))!,
          )
        }
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
                onChange={(e) => updateRoomName(e)}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => addRoom()}
              >
                Add Room
              </button>
            </div>
            <div className="py-2 col-span-3">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => removeZone()}
              >
                Delete Zone
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
