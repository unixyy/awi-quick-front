import {RoomDto} from "./zones.dto";
import {GameDto} from "./games.dto";

export interface AssignGameZoneDto {
  id: number;
  name: string;
  game_assignement : GameDto[];
}