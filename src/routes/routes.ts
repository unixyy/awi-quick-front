// const root = process.env.API_URL;
const root = "http://localhost:3000/"

const gameRoot = root + "game/";
const gameUrl = (id: string) => gameRoot + id;
const gamesByName = (name: string) => gameRoot + "name/" + name;
const gamesByType = (type: string) => gameRoot + "type/" + type;
const gameByZone = (zoneId: number, zoneNumber?: number) =>
  gameRoot + "zone/" + zoneId + (zoneNumber ? "/" + zoneNumber : "");
const zoneRoot = root + "zone/";
const authRoot = root + "auth/";
const signInRoot = authRoot + "signin";
const volunteerRoot = root + "volunteer/";
const volunteerByZone = (zoneId: number) => volunteerRoot + zoneId;

const routes = {
  root,
  gameRoot,
  gameUrl,
  gamesByName,
  gamesByType,
  gameByZone,
  zoneRoot,
  authRoot,
  signInRoot,
  volunteerRoot,
  volunteerByZone,

};

export default routes;