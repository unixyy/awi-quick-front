const root = process.env.API_URL;

export const gameRoot = root + "game/";
export const gameById = (id: string) => gameRoot + id;
export const gamesByName = (name: string) => gameRoot + "name/" + name;
export const gamesByType = (type: string) => gameRoot + "type/" + type;
export const gamesZone = gameRoot + "zone/";
export const gameByZone = (zoneId: number) =>
  gameRoot + "zone/" + zoneId;
export const zoneRoot = root + "zone/";
export const roomRoot = zoneRoot + "room/";
export const zoneById = (id: number) => zoneRoot + id;
export const addRoomToZone = (id: number) => zoneById(id) + "/append";
export const removeRoomFromZone = (id: number) => zoneRoot + "room/" + id;
export const addTableToRoom = (id: number) => zoneRoot + "/room/" + id + "/append";
export const removeTableFromRoom = (id: number) => "/table/" + id;
export const authRoot = root + "auth/";
export const signInRoot = authRoot + "signin";
export const volunteerRoot = root + "volunteer/";
export const volunteerByZone = (zoneId: number) => volunteerRoot + zoneId;
export const volunteerByUUID = (uuid: string) => volunteerRoot + uuid;
