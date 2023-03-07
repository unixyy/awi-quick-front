import React, { useState } from "react";
import { VolunteerDto } from "../../dto/volunteer.dto";
import { RoomAssignmentDto } from "../../dto/zones.dto";
import { TimeslotDto } from "../../dto/timeslot.dto";
import { AssignmentByZoneDto } from "../../dto/assignment.dto";
import {
  volunteerRoot,
  roomRoot,
  timeslotRoot,
  assignmentForVolunteer,
  assignVolunteerToRoom,
  unassignVolunteerFromRoom,
} from "../../routes/routes";
import axios from "axios";

type AssignmentTimeslotDto = TimeslotDto & {
  checked: boolean;
  zone?: string;
  roomId?: number;
};

export default function AssignmentForm() {
  const [volunteers, setVolunteers] = useState<VolunteerDto[]>([]);
  const [rooms, setRooms] = useState<RoomAssignmentDto[]>([]);
  const [timeslots, setTimeslots] = useState<AssignmentTimeslotDto[]>([]);

  const [roomId, setRoomId] = useState("");
  const [volunteerId, setVolunteerId] = useState("");

  const [toggleTimeslots, setToggleTimeslots] = useState<Map<number, boolean>>(
    new Map(),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adding = axios.post(
      assignVolunteerToRoom(volunteerId, parseInt(roomId)),
      {
        timeslotIds: [...toggleTimeslots.entries()]
          .filter(([_, checked]) => checked)
          .map(([id]) => id),
      },
    );
    const deleting = axios.delete(
      unassignVolunteerFromRoom(volunteerId, parseInt(roomId)),
      {
        data: {
          timeslotIds: [...toggleTimeslots.entries()]
            .filter(([_, checked]) => !checked)
            .map(([id]) => id),
        },
      },
    );

    Promise.all([adding, deleting])
      .then(() => {
        setToggleTimeslots(new Map());
        window.alert("Success!");
      })
      .catch((e) => window.alert(e.errorMessage));
  };

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVolunteerId(e.target.value);
    axios.get(assignmentForVolunteer(e.target.value)).then((res) => {
      const assignments: AssignmentByZoneDto[] = res.data;
      const updatedTimeslots = timeslots.map((timeslot) => {
        const assignment = assignments.find((assignment) =>
          assignment.volunteer_assignments.some((ts) => ts.id == timeslot.id),
        );
        return {
          ...timeslot,
          checked: assignment != undefined,
          zone: assignment
            ? assignment.zone.name + " " + assignment.name
            : undefined,
          roomId: assignment ? assignment.id : undefined,
        };
      });
      setTimeslots(updatedTimeslots);
    });
  };

  const handleTimeslotChange = (
    timeslot: AssignmentTimeslotDto,
    index: number,
  ) => {
    const timeslotsToToggle = new Map(toggleTimeslots);
    const updatedTimeslots = [...timeslots];
    updatedTimeslots[index] = { ...timeslot, checked: !timeslot.checked };
    setTimeslots(updatedTimeslots);
    const alreadyChanged = toggleTimeslots.has(timeslot.id);
    alreadyChanged
      ? timeslotsToToggle.delete(timeslot.id)
      : timeslotsToToggle.set(timeslot.id, !timeslot.checked);
    setToggleTimeslots(timeslotsToToggle);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (toggleTimeslots.size > 0) {
      const confirm = window.confirm(
        "You have unsaved changes, you will lose them if you continue. Are you sure you want to continue?",
      );
      if (!confirm) return;
    }
    setRoomId(e.target.value);
    setTimeslots(
      timeslots.map((ts) =>
        toggleTimeslots.has(ts.id) ? { ...ts, checked: !ts.checked } : ts,
      ),
    );
    setToggleTimeslots(new Map());
  };

  React.useEffect(() => {
    axios.get(volunteerRoot).then((res) => setVolunteers(res.data));
    axios.get(roomRoot).then((res) => setRooms(res.data));
    axios
      .get(timeslotRoot)
      .then((res) =>
        setTimeslots(
          res.data.map((ts: TimeslotDto) => ({ ...ts, checked: false })),
        ),
      );
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label htmlFor="room" className="block font-bold mb-2">
            Room
          </label>
          <select
            id="room"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={roomId}
            onChange={handleRoomChange}
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.zone.name + " - " + room.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 px-2">
          <label htmlFor="volunteer" className="block font-bold mb-2">
            Volunteer
          </label>
          <select
            id="volunteer"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={volunteerId}
            onChange={handleVolunteerChange}
          >
            <option value="">Select a volunteer</option>
            {volunteers.map((volunteer) => (
              <option key={volunteer.id} value={volunteer.id}>
                {volunteer.username}
              </option>
            ))}
          </select>
        </div>
      </div>
      {roomId && volunteerId && (
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
          <label className="block font-bold mb-2">Assignments</label>
          <div className="flex flex-wrap w-full">
            {timeslots.map((timeslot, index) => (
              <div
                key={timeslot.id}
                className="flex items-center mb-2 pt-2 border-t-2 w-1/3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox border-gray-300 rounded-sm shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  checked={timeslots[index].checked}
                  disabled={
                    timeslots[index].roomId != undefined &&
                    timeslots[index].roomId != parseInt(roomId)
                  }
                  onChange={() => handleTimeslotChange(timeslot, index)}
                />
                <label htmlFor={`timeslot-${index}`} className="ml-2">
                  <div>
                    {timeslot.zone ?? timeslot.name} - {timeslot.weekday}
                  </div>
                  <div>
                    {new Date(timeslot.start).toLocaleTimeString()} -{" "}
                    {new Date(timeslot.end).toLocaleTimeString()}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
