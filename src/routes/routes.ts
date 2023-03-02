const root = process.env.API_URL;

export const gameRoot = root + "game/";
export const gameById = (id: string) => gameRoot + id;
export const gamesByName = (name: string) => gameRoot + "name/" + name;
export const gamesByType = (type: string) => gameRoot + "type/" + type;
export const gameByZone = (zoneId: number, zoneNumber?: number) =>
  gameRoot + "zone/" + zoneId + (zoneNumber ? "/" + zoneNumber : "");
export const zoneRoot = root + "zone/";
export const zoneById = (id: number) => zoneRoot + id;
export const authRoot = root + "auth/";
export const signInRoot = authRoot + "signin";
export const volunteerRoot = root + "volunteer/";
export const volunteerByZone = (zoneId: number) => volunteerRoot + zoneId;