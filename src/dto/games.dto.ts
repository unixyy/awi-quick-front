import { TableData } from "../Components/Table";

export interface GameDto extends TableData {
  id: number;
  name: string;
  type: string;
  zones?: string[];
}

export interface GameWithZoneDto extends GameDto {
  zoneId: number;
  zoneNumber: number;
}