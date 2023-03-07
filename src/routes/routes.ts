const root = process.env.API_URL;

export const gameRoot = root + "/game/";
export const gameTypes = gameRoot + "types";
export const gameById = (id: string) => gameRoot + id;
export const gamesByName = (name: string) => gameRoot + "name/" + name;
export const gamesByType = (type: string) => gameRoot + "type/" + type;
export const gamesZone = gameRoot + "zone/";
export const gameByZone = (zoneId: number) =>
  gameRoot + "zone/" + zoneId;
export const zoneRoot = root + "/zone/";
export const roomRoot = zoneRoot + "room/";
export const GameZoneAssign = (roomId: string) => roomRoot + roomId + "/assign";
export const GameZoneUnassign = (roomId: string) => roomRoot + roomId + "/unassign";
export const zoneById = (id: number) => zoneRoot + id;
export const addRoomToZone = (id: number) => zoneById(id) + "/append";
export const removeRoomFromZone = (id: number) => zoneRoot + "room/" + id;
export const addTableToRoom = (id: number) =>
  zoneRoot + "room/" + id + "/append";
export const removeTableFromRoom = (id: number) => "/table/" + id;
export const authRoot = root + "/auth/";
export const signInRoot = authRoot + "signin";
export const signUpRoot = authRoot + "signup";
export const volunteerRoot = root + "/volunteer/";
export const volunteerByUUID = (uuid: string) => volunteerRoot + uuid;
export const timeslotRoot = root + "/timeslot/";
export const assignmentForVolunteer = (id: string) =>
  volunteerRoot + id + "/assignments";
export const assignVolunteerToRoom = (id: string, roomId: number) =>
  volunteerByUUID(id) + "/assign/" + roomId;
export const unassignVolunteerFromRoom = (id: string, roomId: number) =>
  volunteerByUUID(id) + "/unassign/" + roomId;
